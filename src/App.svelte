<script>
	function waitForElm(selector) {
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
	}
	(async () => {
		await waitForElm("#map");
		const map = L.map("map");

		L.tileLayer(
			"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
			{
				minZoom: 0,
				maxZoom: 20,
				ext: "png",
			}
		).addTo(map);
		map.setView([54.58173, -5.93747], 15);
	})();
</script>

<main>
	<div id="map" class="leaflet-container" />
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
</style>
