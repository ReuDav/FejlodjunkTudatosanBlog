<script lang="ts">
	import { browser } from '$app/environment';
	import { tick, onMount } from 'svelte';

	import Highlight from 'svelte-highlight';
	import python from 'svelte-highlight/languages/python';
	import csharp from 'svelte-highlight/languages/csharp';
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark';

	import { categories, type CodeLanguage, type LibraryItem } from '$lib/data/algorithmCategories';

	const COOKIE_NAME = 'preferred_code_language';
	const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 4;

	const languageMap = {
		python,
		csharp
	};

	let activeCategory = categories[0].id;
	let selectedItem: LibraryItem | null = null;
	let selectedLanguage: CodeLanguage = 'python';
	let codeDialog: HTMLDialogElement;

	$: activeItems = categories.find((category) => category.id === activeCategory)?.items ?? [];

	$: currentItemIndex = selectedItem
		? activeItems.findIndex((item) => item.id === selectedItem?.id)
		: -1;

	$: hasPreviousItem = currentItemIndex > 0;
	$: hasNextItem = currentItemIndex !== -1 && currentItemIndex < activeItems.length - 1;

	$: selectedCode =
		selectedItem?.codes.find((example) => example.language === selectedLanguage)?.code ??
		selectedItem?.codes[0]?.code ??
		'';

	onMount(() => {
		const savedLanguage = getCookie(COOKIE_NAME);

		if (savedLanguage === 'python' || savedLanguage === 'csharp') {
			selectedLanguage = savedLanguage;
		}
	});

	function getCookie(name: string) {
		if (!browser) return null;

		const cookies = document.cookie.split('; ');

		for (const cookie of cookies) {
			const [key, value] = cookie.split('=');

			if (key === name) {
				return decodeURIComponent(value);
			}
		}

		return null;
	}

	function setLanguageCookie(language: CodeLanguage) {
		if (!browser) return;

		document.cookie = `${COOKIE_NAME}=${encodeURIComponent(language)}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
	}

	function selectCategory(categoryId: typeof activeCategory) {
		activeCategory = categoryId;
	}

	async function openDialog(item: LibraryItem) {
		selectedItem = item;

		await tick();

		if (!codeDialog.open) {
			codeDialog.showModal();
		}
	}

	function closeDialog() {
		codeDialog.close();
		selectedItem = null;
	}

	function showPreviousItem() {
		if (!hasPreviousItem) return;
		selectedItem = activeItems[currentItemIndex - 1];
	}

	function showNextItem() {
		if (!hasNextItem) return;
		selectedItem = activeItems[currentItemIndex + 1];
	}

	function switchToCSharp() {
		selectedLanguage = 'csharp';
		setLanguageCookie('csharp');
	}

	function switchToPython() {
		selectedLanguage = 'python';
		setLanguageCookie('python');
	}
</script>

<svelte:head>
	<title>Programozási tételek könyvtár</title>
	{@html atomOneDark}
</svelte:head>

<div class="page">
	<div class="content">
		<header class="header">
			<h1>Programozási tételek és algoritmusok</h1>

			<div class="language-actions">
				<button
					class="python-button"
					class:active={selectedLanguage === 'python'}
					on:click={switchToPython}
				>
					Python
				</button>

				<button
					class="csharp-button"
					class:active={selectedLanguage === 'csharp'}
					on:click={switchToCSharp}
				>
					C#
				</button>
			</div>
		</header>

		<div class="subnav">
			{#each activeItems as item}
				<button class="item-button" on:click={() => openDialog(item)}>
					{item.label}
				</button>
			{/each}
		</div>
	</div>

	<nav class="bottom-nav">
		{#each categories as category}
			<button
				class:active={activeCategory === category.id}
				on:click={() => selectCategory(category.id)}
			>
				{category.label}
			</button>
		{/each}
	</nav>

	<dialog bind:this={codeDialog} class="code-dialog">
		{#if selectedItem}
			<div class="dialog-shell">
				<header class="dialog-header">
					<h2>{selectedItem.label}</h2>
				</header>

				<div class="code-wrapper">
					<Highlight language={languageMap[selectedLanguage]} code={selectedCode} />
				</div>

				<footer class="dialog-controls">
					<div class="pager-row">
						<button
							class="pager-button"
							disabled={!hasPreviousItem}
							on:click={showPreviousItem}
							aria-label="Előző tétel"
						>
							←
						</button>

						<div class="dialog-language-actions">
							<button
								class="python-button"
								class:active={selectedLanguage === 'python'}
								on:click={switchToPython}
							>
								Python
							</button>

							<button
								class="csharp-button"
								class:active={selectedLanguage === 'csharp'}
								on:click={switchToCSharp}
							>
								C#
							</button>
						</div>

						<button
							class="pager-button"
							disabled={!hasNextItem}
							on:click={showNextItem}
							aria-label="Következő tétel"
						>
							→
						</button>
					</div>

					<button class="back-button" on:click={closeDialog}>
						Vissza
					</button>
				</footer>
			</div>
		{/if}
	</dialog>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		background: #0f172a;
		color: white;
	}

	.page {
		min-height: 100vh;
		padding-bottom: 220px;
		box-sizing: border-box;
	}

	.content {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 2rem);
	}

	.language-actions,
	.dialog-language-actions {
		display: flex;
		gap: 0.5rem;
	}

	.python-button,
	.csharp-button {
		border: none;
		border-radius: 12px;
		padding: 0.7rem 1rem;
		color: white;
		font-weight: 800;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			opacity 0.15s ease,
			background 0.15s ease;
	}

	.python-button {
		background: #1e293b;
	}

	.csharp-button {
		background: #7c3aed;
	}

	.python-button.active {
		background: #2563eb;
	}

	.csharp-button.active {
		background: #9333ea;
		box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.35);
	}

	.python-button:hover,
	.csharp-button:hover {
		transform: translateY(-1px);
		opacity: 0.95;
	}

	.subnav {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.item-button {
		width: 100%;
		border: none;
		border-radius: 14px;
		padding: 0.9rem 1rem;
		background: #1e293b;
		color: white;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
	}

	.item-button:hover {
		background: #334155;
	}

	.bottom-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
		background: rgba(15, 23, 42, 0.96);
		backdrop-filter: blur(10px);
		border-top: 1px solid #1f2937;
	}

	.bottom-nav button {
		width: 100%;
		border: none;
		border-radius: 14px;
		padding: 0.9rem 1rem;
		background: #1e293b;
		color: white;
		font-weight: 800;
		cursor: pointer;
		text-align: center;
	}

	.bottom-nav button:hover {
		background: #334155;
	}

	.bottom-nav button.active {
		background: #2563eb;
	}

	.code-dialog {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		border: none;
		border-radius: 0;
		padding: 0;
		background: #020617;
		color: white;
		overflow: hidden;
	}

	.code-dialog::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}

	.dialog-shell {
		height: 100dvh;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: 0.75rem;
		padding: 1rem;
		box-sizing: border-box;
		overflow: hidden;
	}

	.dialog-header h2 {
		margin: 0;
		font-size: clamp(1.15rem, 3vw, 1.8rem);
	}

	.code-wrapper {
		min-height: 0;
		overflow: auto;
		border-radius: 14px;
		background: #0b1020;
	}

	.dialog-controls {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pager-row {
		display: grid;
		grid-template-columns: 100px minmax(0, 1fr) 100px;
		align-content: center;
		gap: 0.5rem;
		align-content: center;
	}

	.dialog-language-actions {
		justify-content: center;
		min-width: 0;
	}

	.dialog-language-actions .python-button,
	.dialog-language-actions .csharp-button {
		flex: 1;
		max-width: 130px;
	}

	.pager-button {
		width: 100%;
		height: 48px;
		border: none;
		border-radius: 14px;
		background: #1e293b;
		color: white;
		font-size: 2rem;
		font-weight: 900;
		cursor: pointer;
	}

	.pager-button:hover:not(:disabled) {
		background: #334155;
	}

	.pager-button:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.back-button {
		width: 100%;
		border: none;
		border-radius: 14px;
		padding: 1rem;
		background: #2563eb;
		color: white;
		font-size: 1rem;
		font-weight: 800;
		cursor: pointer;
	}

	.back-button:hover {
		background: #1d4ed8;
	}

	:global(pre) {
		margin: 0 !important;
		padding: 1rem !important;
		font-size: clamp(0.78rem, 2.5vw, 1.05rem) !important;
		line-height: 1.55 !important;
		overflow: auto !important;
		white-space: pre !important;
		tab-size: 2;
		min-height: 100%;
		box-sizing: border-box;
	}

	:global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
	}

	@media (max-width: 640px) {
		.page {
			padding-bottom: 210px;
		}

		.content {
			padding: 0.75rem;
		}

		.header {
			flex-direction: column;
		}

		.language-actions {
			width: 100%;
		}

		.language-actions .python-button,
		.language-actions .csharp-button {
			flex: 1;
		}

		.dialog-shell {
			height: 100dvh;
			gap: 0.6rem;
			padding: 0.75rem;
		}

		.dialog-header h2 {
			font-size: 1.05rem;
		}

		.pager-button {
			width: 100%;
			height: 46px;
		}

		.dialog-language-actions .python-button,
		.dialog-language-actions .csharp-button {
			padding: 0.65rem 0.5rem;
			max-width: none;
		}

		.back-button {
			padding: 0.85rem;
		}

		:global(pre) {
			font-size: 0.82rem !important;
			padding: 0.85rem !important;
		}
	}
</style>