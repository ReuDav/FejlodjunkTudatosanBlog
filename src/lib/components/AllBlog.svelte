<script lang="ts">
	import { onMount } from 'svelte';
	import { locale, _ } from 'svelte-i18n';
	import { get } from 'svelte/store';

	type BlogPost = {
		id: number;
		title: string;
		content: string;
		cover_image: string;
		read_time: number;
		tags: string[];
		slug: string;
		created_at: string;
	};

	let posts: BlogPost[] = [];
	let filtered: BlogPost[] = [];
	let loading = true;
	let error = '';
	let search = '';

	const $_ = get(_);

	onMount(async () => {
		const currentLocale = get(locale);

		try {
			const res = await fetch(`https://api.fejlodjunktudatosan.hu/api/blogs/all?locale=${currentLocale}`);
			const json = await res.json();

			if (json.status === 'success') {
				posts = json.data;
				filtered = posts;
			} else {
				error = $_('blogs.error');
			}
		} catch (e) {
			error = $_('blogs.error');
			console.error(e);
		} finally {
			loading = false;
		}
	});

	// 🔍 Keresés
	$: filtered = posts.filter((post) => {
		const q = search.toLowerCase();
		return (
			post.title.toLowerCase().includes(q) ||
			post.content.toLowerCase().includes(q) ||
			post.tags.some((tag) => tag.toLowerCase().includes(q))
		);
	});
</script>

<section class="blog-list">
	<h1>{$_('blogs.title')}</h1>

	<input
		type="text"
		class="search-box"
		placeholder="{$_('blogs.placeholder')}"
		bind:value={search}
	/>

	{#if loading}
		<p>{$_('blogs.loading')}</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if filtered.length === 0}
		<p>{$_('blogs.no_results') || 'Nincs találat a keresésre.'}</p>
	{:else}
		<div class="grid">
			{#each filtered as post (post.id)}
				<article class="blog-card">
					<img src={post.cover_image} alt={post.title} />
					<div class="card-content">
						<h2>{post.title}</h2>
						<p class="meta">
							🕒 {$_('blogs.reading_time', { min: post.read_time })}
						</p>

						<div class="tags">
							{#each post.tags as tag}
								<span class="tag">#{tag}</span>
							{/each}
						</div>

						<a href={`/${get(locale)}/blog/${post.slug}`} class="read-more">
							{$_('blogs.read_more')}
						</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.blog-list {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.search-box {
		width: 100%;
		max-width: 400px;
		margin: 0 auto 2rem auto;
		display: block;
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 6px;
		font-size: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		justify-items: center;
	}

	.blog-card {
		width: 100%;
		max-width: 360px;
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		transition: transform 0.2s;
	}

	.blog-card:hover {
		transform: scale(1.01);
	}

	.blog-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.card-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		font-size: 1.2rem;
		margin: 0;
	}

	.meta {
		font-size: 0.9rem;
		color: #777;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tag {
		background-color: #f0f0f0;
		color: #333;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		font-size: 0.85rem;
	}

	.read-more {
		margin-top: auto;
		color: var(--color-theme-1, #007bff);
		font-weight: bold;
		text-decoration: none;
	}

	.read-more:hover {
		text-decoration: underline;
	}

	.error {
		color: red;
		text-align: center;
	}
</style>
