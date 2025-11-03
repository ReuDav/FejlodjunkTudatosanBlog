<script>
	import { Hamburger } from 'svelte-hamburgers';
	import { locale, _, dictionary } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let isOpen = false;

	// Navigációs menüpont kulcsok (slug & szöveg)
	const links = [{ key: 'about' }, { key: 'blog' }, { key: 'contact' }];

	// 🔧 Route key visszakeresése (slug alapján)
	function getRouteKeyByValue(localeValue, pathSegment) {
		const dict = get(dictionary);
		const routes = dict?.[localeValue]?.routes;
		if (!routes) return null;
		return Object.keys(routes).find((key) => routes[key] === pathSegment);
	}

	// 🔄 Nyelvváltó függvény
	async function switchLocale(newLocale) {
	const dict = get(dictionary);

	// Ha még nincs betöltve a fordítás
	if (!dict?.[newLocale]?.routes) {
		setTimeout(() => switchLocale(newLocale), 10);
		return;
	}

	const currentPage = get(page);
	const currentPath = currentPage.url.pathname;

	const [, currentLocale, currentSegment] = currentPath.split('/');

	const routeKey = getRouteKeyByValue(currentLocale, currentSegment);

	const newSlug = dict?.[newLocale]?.routes?.[routeKey] || '';

	locale.set(newLocale);

	setTimeout(() => {
		goto(`/${newLocale}/${newSlug}`);
	}, 0);
}

</script>

<header>
	<nav>
		<a href="/{$locale}" class="logo">
			<img src="/logo.svg" alt="logo" height="72" />
		</a>

		<!-- Hamburger ikon (csak mobil) -->
		<div class="hamburger">
			<Hamburger
				open={isOpen}
				onclick={() => (isOpen = !isOpen)}
				type="spin"
				--color={isOpen ? 'white' : 'black'}
			/>
		</div>

		<!-- Menüpontok (ugyanaz desktopra és mobil overlay-re) -->
		<ul class="menu" class:is-open={isOpen}>
			<li>
				<a href="/{$locale}">
					{$_('nav.home')}
				</a>
			</li>
			{#each links as { key }}
				<li>
					<a href={`/${$locale}/${$_(`routes.${key}`)}`} on:click={() => (isOpen = false)}>
						{$_(`nav.${key}`)}
					</a>
				</li>
			{/each}
			<li>
				<select
					bind:value={$locale}
					on:change={(e) => switchLocale(e.target.value)}
					class="lang-switcher"
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
		position: relative;
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
	}

	a:hover {
		color: var(--color-theme-1);
	}

	/* Hamburger (csak mobilon) */
	.hamburger {
		display: none;
	}

	.menu {
		/* desktop */
		display: flex;
		align-items: center;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
		transition: all 0.4s ease;
	}
	.lang-switcher {
		background-color: transparent;
		border: none;
	}
	/* === MOBILE: Overlay menü === */
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
