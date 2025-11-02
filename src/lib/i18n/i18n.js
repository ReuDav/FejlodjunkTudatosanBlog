import { register, init, getLocaleFromNavigator, locale as $locale } from 'svelte-i18n';

export const defaultLocale = 'hu';

// fordítások regisztrálása
register('en', () => import('./en.json'));
register('hu', () => import('./hu.json'));

export async function setupI18n() {
	await init({
		fallbackLocale: defaultLocale,
		initialLocale: getLocaleFromNavigator() || defaultLocale
	});
}

// exportáljuk a store-t
export const locale = $locale;
