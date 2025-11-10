<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let loading = true;
	let error = '';
	let blog: any = null;

	let currentSlug = '';
	let currentLocale = '';

	// 📦 Figyeljünk a route változásra
	$: {
		const pathParts = $page.url.pathname.split('/');
		if (pathParts.length >= 4) {
			const [ , newLocale, , newSlug ] = pathParts;

			// Ha bármelyik változott, újratöltjük
			if (newLocale !== currentLocale || newSlug !== currentSlug) {
				currentLocale = newLocale;
				currentSlug = newSlug;
				fetchBlog();
			}
		}
	}

	// Markdown render action
	function renderMarkdown(node: HTMLElement) {
		if (blog?.content) {
			node.innerHTML = marked.parse(blog.content);
		}
	}

	async function fetchBlog() {
		loading = true;
		error = '';
		blog = null;

		try {
			const res = await fetch(
				`https://api.fejlodjunktudatosan.hu/api/blog/by-slug?slug=${currentSlug}&locale=${currentLocale}`
			);
			const json = await res.json();

			if (json.status === 'success') {
				blog = json.blog;
			} else {
				error = $_('blogs.error');
			}
		} catch (e) {
			error = $_('blogs.error');
			console.error(e);
		} finally {
			loading = false;
		}
	}

	onMount(fetchBlog);
</script>


{#if loading}
	<p class="center">{$_('blogs.loading')}</p>
{:else if error}
	<p class="error">{error}</p>
{:else if blog}
	<article class="blog-container">
		<h1>{blog.title}</h1>

		<div class="meta">
			🕒 {$_('blogs.reading_time').replace('{min}', blog.read_time)}
		</div>

		{#if blog.tags?.length}
			<div class="tags">
				{#each blog.tags as tag}
					<span class="tag">#{tag.label}</span>
				{/each}
			</div>
		{/if}

		{#if blog.cover_image}
			<img
				src={`https://api.fejlodjunktudatosan.hu/${blog.cover_image}`}
				alt={blog.title}
				class="cover-image"
			/>
		{/if}

		<div class="content" use:renderMarkdown></div>

		{#if blog.alt_locale_slug}
			<a
				class="lang-switch"
				href={`/${currentLocale === 'hu' ? 'en' : 'hu'}/blog/${blog.alt_locale_slug}`}
			>
				{currentLocale === 'hu' ? 'English version 🇬🇧' : 'Magyar verzió 🇭🇺'}
			</a>
		{/if}
	</article>
{/if}

<style>
	.blog-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		line-height: 1.6;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.meta {
		color: #777;
		margin-bottom: 1rem;
		font-size: 0.95rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tag {
		background: #f0f0f0;
		padding: 0.3rem 0.7rem;
		border-radius: 12px;
		font-size: 0.85rem;
		color: #444;
	}

	.cover-image {
		width: 100%;
		max-height: 400px;
		object-fit: cover;
		border-radius: 8px;
		margin: 2rem 0;
	}

	.content :global(h2),
	.content :global(h3),
	.content :global(p),
	.content :global(ul),
	.content :global(ol),
	.content :global(blockquote) {
		margin-bottom: 1rem;
	}

	.content :global(h2) {
		font-size: 1.5rem;
		margin-top: 2rem;
	}

	.content :global(h3) {
		font-size: 1.2rem;
	}

	.content :global(blockquote) {
		border-left: 4px solid #ccc;
		padding-left: 1rem;
		color: #555;
		font-style: italic;
		background: #fafafa;
	}

	.center {
		text-align: center;
	}

	.error {
		color: red;
		text-align: center;
	}

	.lang-switch {
		display: inline-block;
		margin-top: 2rem;
		padding: 0.5rem 1rem;
		background: #f5f5f5;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		font-weight: 500;
	}

	.lang-switch:hover {
		background: #e9e9e9;
	}
</style>
