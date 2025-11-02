import { getLocaleFromHeaders } from 'svelte-i18n';

export const handle = async ({ event, resolve }) => {
	const detectedLocale = getLocaleFromHeaders(event.request.headers) || 'hu';
	event.locals.locale = detectedLocale;
    console.log("detectedLocale ", detectedLocale);
        console.log("event.locals.locale ", event.locals.locale);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return response;
};
