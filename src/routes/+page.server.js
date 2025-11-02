import { redirect } from '@sveltejs/kit';

export function load({ url, request }) {
	const pathname = url.pathname;
	if (pathname.startsWith('/hu') || pathname.startsWith('/en')) return;

	const accept = request.headers.get('accept-language') || '';
	const lang = accept.split(',')[0]?.split('-')[0] ?? 'hu';
	const supported = ['en', 'hu'];
	const detected = supported.includes(lang) ? lang : 'hu';

	throw redirect(307, `/${detected}`);
}
