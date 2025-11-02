import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const LOCALES = ['en', 'hu'];

register('en', () => import('./en.json'));
register('hu', () => import('./hu.json'));

export function setupI18n(locale) {
  console.log('[i18n] INIT called with lang =', locale);

  init({
    fallbackLocale: 'hu',
    initialLocale: locale || getLocaleFromNavigator(),
  });
}
