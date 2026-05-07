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

	$: selectedCode =
		selectedItem?.codes.find((example) => example.language === selectedLanguage)?.code ??
		selectedItem?.codes[0]?.code ??
		'';

	$: selectedLanguageLabel = selectedLanguage === 'python' ? 'Python' : 'C#';

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
			<div>
				<h1>Programozási tételek és algoritmusok</h1>
			</div>

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
					<span>{item.label}</span>
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
			<div class="dialog-content">
				<div class="dialog-header">
					<div>
						<h2>{selectedItem.label}</h2>
					</div>
				</div>

				<div class="code-wrapper">
					<Highlight language={languageMap[selectedLanguage]} code={selectedCode} />
				</div>

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

				<button class="back-button" on:click={closeDialog}> Vissza </button>
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
		margin: 0 0 0.35rem;
		font-size: clamp(1.35rem, 3vw, 2rem);
	}

	p {
		margin: 0;
		color: #cbd5e1;
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
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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

	.item-button small {
		color: #93c5fd;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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
		height: 100vh;
		max-width: none;
		max-height: none;
		margin: 0;
		border: none;
		border-radius: 0;
		padding: 0;
		background: #020617;
		color: white;
	}

	.code-dialog::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}

	.dialog-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}

	.dialog-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.dialog-header h2 {
		margin: 0;
		font-size: clamp(1.25rem, 3vw, 1.8rem);
	}

	.code-wrapper {
		flex: 1;
		min-height: 0;
		overflow: auto;
		margin-bottom: 1rem;
		border-radius: 14px;
		background: #0b1020;
	}

	:global(pre) {
		margin: 0 !important;
		padding: 1rem !important;
		font-size: clamp(0.78rem, 2.5vw, 1.05rem) !important;
		line-height: 1.55 !important;
		overflow-x: auto !important;
		overflow-y: auto !important;
		white-space: pre !important;
		tab-size: 2;
		min-height: 100%;
		box-sizing: border-box;
	}

	:global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
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

	@media (max-width: 640px) {
		.content {
			padding: 0.75rem;
		}

		.header,
		.dialog-header {
			flex-direction: column;
		}

		.language-actions,
		.dialog-language-actions {
			width: 100%;
		}

		.python-button,
		.csharp-button {
			flex: 1;
		}

		.dialog-content {
			padding: 0.75rem;
		}

		:global(pre) {
			font-size: 0.95rem !important;
			padding: 1rem !important;
		}
	}
</style>
