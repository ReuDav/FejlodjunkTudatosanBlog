// utils/i18n.js
import { get } from 'svelte-i18n';

/**
 * Visszaadja a kulcsot egy adott útvonal alapján.
 * pl. "rolunk" -> "about"
 */
export default function getRouteKeyByValue(localeValue, pathSegment) {
	const dict = get(dictionary);
	const routes = dict?.[localeValue]?.routes;
	if (!routes) return null;

	return Object.keys(routes).find((key) => routes[key] === pathSegment);
}
