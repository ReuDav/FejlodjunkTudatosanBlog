<script lang="ts">
	import { onMount } from 'svelte';

	type BlogPost = {
		id: number;
		title: string;
		subtitle: string;
		content: string;
		cover_image: string;
		read_time: number;
		tags: string;
		created_at: string;
	};

	let posts: BlogPost[] = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/blogs/all');
			const json = await res.json();

			if (json.status === 'success') {
				posts = json.data;
			} else {
				error = 'Nem sikerült betölteni a blogokat.';
			}
		} catch (e) {
			error = 'Hálózati hiba történt.';
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

<section class="blog-list">
	<h1>📚 Blogbejegyzések</h1>

	{#if loading}
		<p>Töltés...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else}
		<div class="grid">
			{#each posts as post (post.id)}
				<article class="blog-card">
					<img src={post.cover_image} alt={post.title} />
					<div class="card-content">
						<h2>{post.title}</h2>
						<p class="subtitle">{post.subtitle}</p>
						<p class="meta">
							🕒 {post.read_time} perc olvasás • 🏷️
							{JSON.parse(post.tags).join(', ')}
						</p>
						<a href={`/blog/${post.id}`} class="read-more">Olvasd tovább →</a>
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

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.blog-card {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		background: white;
		display: flex;
		flex-direction: column;
		transition: transform 0.2s;
	}

	.blog-card:hover {
		transform: scale(1.01);
	}

	.blog-card img {
		width: 100%;
		height: 180px;
		object-fit: cover;
	}

	.card-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card-content h2 {
		font-size: 1.2rem;
		margin: 0;
	}

	.subtitle {
		font-style: italic;
		color: #555;
	}

	.meta {
		font-size: 0.9rem;
		color: #777;
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
