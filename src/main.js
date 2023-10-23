import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Parking Angel'
	}
});

export default app;