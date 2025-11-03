<script>
	import { setupI18n } from '$lib/i18n/i18n';
	import { locale } from 'svelte-i18n';
	import "../../app.css"
	import Header from '$lib/components/Header.svelte';
	export let data;

	setupI18n(data.locale); // ⬅ kritikus, azonnal fusson le

	console.log('[+layout.svelte] Loaded with data:', data);
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
