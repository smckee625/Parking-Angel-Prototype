<script>
	// create global function which is overwritten later in the code
	let toggleCrime;

	// waits for a DOM element to exist on the page
	const waitFor = (selector) => {
		return new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver((mutations) => {
				if (document.querySelector(selector)) {
					observer.disconnect();
					resolve(document.querySelector(selector));
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});
	};

	// waits for map div to exist
	waitFor("#map").then(() => {
		// create map
		const map = L.map("map");

		// create visual map layer and add it to map
		L.tileLayer(
			"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
			{
				minZoom: 0,
				maxZoom: 20,
				ext: "png",
				updateWhenIdle: false,
			}
		).addTo(map);

		// transform crime data into coords - i.e [[50.22,78.18],[29.83,43.65]...]
		const crimeCoords = data.map(({ Latitude, Longitude }) => [
			Latitude,
			Longitude,
		]);

		// create heapmap using crimedata coordseta
		const heat = L.heatLayer(crimeCoords, {
			radius: 25,
			maxZoom: 18,
			minOpacity: 0.4,
		});
		map.addLayer(heat);

		// create function to remove and add heatmap
		let toggle = true;
		toggleCrime = () => {
			toggle ? map.removeLayer(heat) : map.addLayer(heat);
			toggle = !toggle;
		};

		// set default view location
		map.setView([54.58173, -5.93747], 15);

		// create marker and set it's position to the current user location
		let marker;
		navigator.geolocation.getCurrentPosition((position) => {
			map.setView([position.coords.latitude, position.coords.longitude], 15);
			marker = L.marker([
				position.coords.latitude,
				position.coords.longitude,
			]).addTo(map);

			// update user marker position every 500ms
			setInterval(() => {
				navigator.geolocation.getCurrentPosition((position) => {
					marker.setLatLng([
						position.coords.latitude,
						position.coords.longitude,
					]);
				});
			}, 500);
		});

		// hack - reset heatmap before panning ends
		let move = false;
		setInterval(() => {
			if (move) heat._reset();
		}, 75);
		window.addEventListener("touchmove", (e) => {
			const computed = window.getComputedStyle(e.target)["cursor"];
			move = computed === "grabbing";
		});
		window.addEventListener("mousemove", (e) => {
			const computed = window.getComputedStyle(e.target)["cursor"];
			move = computed === "grabbing";
		});

		// hack - reset heatmap on zoom change
		let previousZoom = 15;
		map.on("zoom", (e) => {
			const currentZoom = e.target._zoom.toFixed(3);
			if (previousZoom !== currentZoom) {
				previousZoom = currentZoom;
				heat._reset();
			}
		});

		// make heatmap slightly transparent
		document.querySelector(".leaflet-heatmap-layer").style.opacity = "60%";
	});
</script>

<main>
	<div id="map" class="leaflet-container" />
	<button
		on:click={toggleCrime}
		id="crime"
		style="width: 20vw; position: absolute; top:10px; left: calc(50% - 10vw); z-index:1000000"
		>Crime</button
	>
</main>

<style>
	html,
	body {
		height: 100%;
		margin: 0;
	}
	.leaflet-container {
		height: 100vh;
		width: 100vw;
		max-width: 100%;
		max-height: 100%;
	}

	.leaflet-heatmap-layer {
		opacity: 10%;
	}
</style>
