<script>
	import { Hamburger } from 'svelte-hamburgers';
	import { locale, _, dictionary } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	let isOpen = false;

	const links = [{ key: 'about' }, { key: 'blog' }, { key: 'contact' }];

	function getRouteKeyByValue(localeValue, pathSegment) {
		const dict = get(dictionary);
		const routes = dict?.[localeValue]?.routes;
		if (!routes) return null;
		return Object.keys(routes).find((key) => routes[key] === pathSegment);
	}

	async function switchLocale(newLocale) {
		const dict = get(dictionary);
		if (!dict?.[newLocale]?.routes) {
			setTimeout(() => switchLocale(newLocale), 10);
			return;
		}

		const currentPage = get(page);
		const currentPath = currentPage.url.pathname;
		const [, currentLocale, route, maybeSlug] = currentPath.split('/');

		if (route === 'blog' && maybeSlug) {
			try {
				const res = await fetch(
					`https://api.fejlodjunktudatosan.hu/api/blog/by-slug?slug=${maybeSlug}&locale=${currentLocale}`
				);
				const json = await res.json();
				if (json.status === 'success') {
					const newSlug = json.blog.alt_locale_slug;
					locale.set(newLocale);
					goto(`/${newLocale}/blog/${newSlug}`);
					return;
				}
			} catch (err) {
				console.error('Blog locale switch error:', err);
			}
		}

		const routeKey = getRouteKeyByValue(currentLocale, route);
		const newSlug = dict?.[newLocale]?.routes?.[routeKey] || '';
		locale.set(newLocale);
		goto(`/${newLocale}/${newSlug}`);
	}
</script>

<header>
	<nav>
		<a href="/{$locale}" class="logo">
			<img src="/logo.svg" alt="logo" height="72" />
		</a>

		<!-- Hamburger ikon -->
		<div class="hamburger">
			<Hamburger
				open={isOpen}
				onclick={() => (isOpen = !isOpen)}
				type="spin"
				--color={isOpen ? 'white' : 'black'}
			/>
		</div>

		<ul class="menu" class:is-open={isOpen}>
			<!-- Home -->
			<li>
				<a href="/{$locale}">{$_('nav.home')}</a>
			</li>

			<!-- Menü linkek -->
			{#each links as { key }}
				<li>
					<a href={`/${$locale}/${$_(`routes.${key}`)}`} on:click={() => (isOpen = false)}>
						{$_(`nav.${key}`)}
					</a>
				</li>
			{/each}
			<!-- Login/Register ikonok -->
			<li>
				<a href="/{$locale}/login" aria-label="Login">
					<FontAwesomeIcon icon={faSignInAlt} />
				</a>
			</li>
			<li>
				<a href="/{$locale}/register" aria-label="Register">
					<FontAwesomeIcon icon={faUserPlus} />
				</a>
			</li>
			<!-- Nyelvváltó -->
			<li>
				<select
					bind:value={$locale}
					on:change={(e) => switchLocale(e.target.value)}
					class="lang-switcher"
					aria-label="Válassz nyelvet"
				>
					<option value="hu">HU</option>
					<option value="en">EN</option>
				</select>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		height: 100px;
		padding: 0 1em;
		display: flex;
		align-items: center;
		background: var(--background);
		position: relative;
		z-index: 10;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.4s ease;
	}

	li a {
		color: var(--color-text);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-size: 0.8rem;
		transition: color 0.2s linear;
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.hamburger {
		display: none;
	}

	.menu {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.lang-switcher {
		background-color: transparent;
		border: none;
		color: inherit;
		font-weight: bold;
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		.hamburger {
			display: block;
			z-index: 101;
		}

		.menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: rgba(0, 0, 0, 0.95);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			z-index: 100;
		}

		.menu.is-open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
		}

		.menu li a {
			font-size: 1.5rem;
			color: white;
		}
	}
</style>
