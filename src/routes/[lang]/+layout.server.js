import { setupI18n } from '$lib/i18n/i18n';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const locale = params.lang || 'hu';
	console.log('[+layout.server.js] Locale param:', locale);
	setupI18n(locale); // ← optional: only matters if SSR string formatting needed
	return { locale };
}
