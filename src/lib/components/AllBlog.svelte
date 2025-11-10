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
		placeholder="Keresés cím, tartalom vagy címke alapján..."
		bind:value={search}
		class="search-box"
	/>

	{#if loading}
		<p>{$_('blogs.loading')}</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else}
		{#if filtered.length === 0}
			<p>Nincs találat a keresésre.</p>
		{:else}
			<div class="grid">
				{#each filtered as post (post.id)}
					<article class="blog-card">
						<img src={post.cover_image} alt={post.title} />
						<div class="card-content">
							<h2>{post.title}</h2>
							<p class="meta">
								🕒 {$_('blogs.reading_time', { min: post.read_time })} • 🏷️ {post.tags.join(', ')}
							</p>
							<a href={`/${get(locale)}/blog/${post.slug}`} class="read-more">
								{$_('blogs.read_more')}
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	{/if}
</section>

<style>
	.blog-list {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
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
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.blog-card {
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

	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.card-content {
		padding: 1rem;
	}

	h2 {
		margin-bottom: 0.5rem;
		font-size: 1.2rem;
	}

	.meta {
		font-size: 0.9rem;
		color: #777;
		margin-bottom: 1rem;
	}

	.read-more {
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
