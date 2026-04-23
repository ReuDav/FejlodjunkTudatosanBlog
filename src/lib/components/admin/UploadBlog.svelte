<script lang="ts">
	let title_hu = '';
	let content_hu = '';
	let title_en = '';
	let content_en = '';
	let slug = '';
	let read_time = 5;
	let tags_hu = '';
	let tags_en = '';
	let coverImage: File | null = null;
	let coverPreview: string | null = null;

	let submitting = false;
	let message = '';

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			coverImage = input.files[0];
			coverPreview = URL.createObjectURL(coverImage);
		}
	}

	async function submitBlog() {
		const token = localStorage.getItem('jwt_token');
		if (!token) {
			message = '❌ Bejelentkezés szükséges';
			return;
		}

		const formData = new FormData();
		if (coverImage) {
			formData.append('cover_image', coverImage);
		}
		formData.append('read_time', read_time.toString());
		formData.append('slug', slug);

		formData.append('title_hu', title_hu);
		formData.append('content_hu', content_hu);
		formData.append('tags_hu', tags_hu);

		formData.append('title_en', title_en);
		formData.append('content_en', content_en);
		formData.append('tags_en', tags_en);

		submitting = true;
		message = '';

		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/admin/blogs/create', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			const data = await res.json();
			if (data.status === 'success') {
				message = '✅ Blog sikeresen feltöltve!';
				resetForm();
			} else {
				message = `❌ ${data.message || 'Hiba a feltöltéskor'}`;
			}
		} catch (e) {
			console.error(e);
			message = '❌ Hálózati hiba történt.';
		} finally {
			submitting = false;
		}
	}

	function resetForm() {
		title_hu = '';
		content_hu = '';
		tags_hu = '';
		title_en = '';
		content_en = '';
		tags_en = '';
		slug = '';
		read_time = 5;
		coverImage = null;
		coverPreview = null;
	}
</script>

<section class="create-blog">
	<h1>📝 Új blogbejegyzés (két nyelven)</h1>

	{#if message}
		<p class="status">{message}</p>
	{/if}

	<div class="form-grid">
		<div class="lang-block">
			<h2>🇭🇺 Magyar</h2>
			<input type="text" placeholder="Cím (HU)" bind:value={title_hu} required />
			<textarea rows="6" placeholder="Tartalom (HU)" bind:value={content_hu} required></textarea>
			<input type="text" placeholder="Tagek (vesszővel elválasztva)" bind:value={tags_hu} />
		</div>

		<div class="lang-block">
			<h2>🇬🇧 English</h2>
			<input type="text" placeholder="Title (EN)" bind:value={title_en} required />
			<textarea rows="6" placeholder="Content (EN)" bind:value={content_en} required></textarea>
			<input type="text" placeholder="Tags (comma separated)" bind:value={tags_en} />
		</div>
	</div>

	<input type="text" placeholder="Slug (pl. tudatossag-a-mindennapokban)" bind:value={slug} />
	<input type="number" min="1" max="15" bind:value={read_time} placeholder="Olvasási idő (perc)" />

	<label>📷 Borítókép</label>
	<input type="file" accept="image/*" on:change={handleFileChange} />
	{#if coverPreview}
		<img src={coverPreview} alt="Előnézet" class="preview" />
	{/if}

	<button on:click={submitBlog} disabled={submitting}>
		{submitting ? 'Feltöltés...' : 'Blog létrehozása'}
	</button>
</section>

<style>
	.create-blog {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1.5rem;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.form-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.lang-block {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	input, textarea {
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
		width: 100%;
	}

	.preview {
		width: 100%;
		max-width: 300px;
		margin: 1rem 0;
		border-radius: 6px;
		border: 1px solid #ddd;
	}

	button {
		padding: 0.75rem 2rem;
		background: var(--color-theme-1, #007bff);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		display: block;
		margin: 1rem auto 0 auto;
	}

	button:hover {
		background: #0056b3;
	}

	.status {
		text-align: center;
		font-weight: bold;
		margin-bottom: 1rem;
		color: green;
	}
</style>
