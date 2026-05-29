<script lang="ts">
	import { algoItems } from '$lib/data/algo';

	let search = $state('');
	let category = $state('Összes');
	let currentPage = $state(1);
	let readingMode = $state(false);

	const perPage = 1;

	let categories = $derived.by(() => [
		'Összes',
		...Array.from(new Set(algoItems.map((x) => x.category)))
	]);

	let filtered = $derived.by(() => {
		const term = search.toLowerCase().trim();

		return algoItems.filter((item) => {
			const categoryMatch =
				category === 'Összes' ||
				item.category === category;

			const searchMatch =
				item.question.toLowerCase().includes(term) ||
				item.answer.toLowerCase().includes(term);

			return categoryMatch && searchMatch;
		});
	});

	let totalPages = $derived(
		Math.max(1, Math.ceil(filtered.length / perPage))
	);

	let pagedItems = $derived.by(() => {
		const start = (currentPage - 1) * perPage;
		return filtered.slice(start, start + perPage);
	});

	function selectCategory(cat: string) {
		category = cat;
		currentPage = 1;
	}

	function toggleReadingMode() {
		readingMode = !readingMode;
	}
</script>

<main>
	<section class="algo">

		<div class="content">
			{#if pagedItems.length === 0}
				<article>
					<span>Nincs találat</span>
					<h2>Nem találtam kérdést.</h2>
				</article>
			{:else}
				{#each pagedItems as item}
					<article>

						<span>
							{item.category}
							·
							{item.id}. kérdés
						</span>

						<h2>
							{item.question}
						</h2>

						<p>
							{item.answer}
						</p>

					</article>
				{/each}
			{/if}
		</div>

		<div class="bottom">

			<button
				class="eye"
				class:active={readingMode}
				onclick={toggleReadingMode}
			>
				{readingMode ? '👁️‍🗨️ UI vissza' : '👁️ Olvasási mód'}
			</button>

			{#if !readingMode}

				<input
					type="search"
					placeholder="Keresés..."
					bind:value={search}
					oninput={() => currentPage = 1}
				/>

				<div class="categories">

					{#each categories as item}

						<button
							class:active={category === item}
							onclick={() => selectCategory(item)}
						>
							{item}
						</button>

					{/each}

				</div>

				<div class="pager">

					<button
						disabled={currentPage === 1}
						onclick={() => currentPage--}
					>
						←
					</button>

					<strong>
						{currentPage} / {totalPages}
					</strong>

					<button
						disabled={currentPage === totalPages}
						onclick={() => currentPage++}
					>
						→
					</button>

				</div>

			{/if}

		</div>

	</section>
</main>

<style>

	main{
		min-height:calc(100vh - 100px);
		background:#fafafa;
	}

	.algo{
		min-height:100%;
		display:flex;
		flex-direction:column;
	}

	.content{
		flex:1;
		padding:1rem;
		padding-bottom:14rem;
	}

	article{
		max-width:900px;
		margin:0 auto;
		background:white;
		border-radius:28px;
		padding:1.4rem;
		box-shadow:0 10px 40px rgba(0,0,0,.08);
	}

	span{
		display:block;
		margin-bottom:1rem;
		font-size:1rem;
		font-weight:700;
		color:#666;
	}

	h2{
		margin:0 0 1rem;
		font-size:clamp(1.55rem,6vw,2.6rem);
		line-height:1.25;
		color:#111;
	}

	p{
		margin:0;
		white-space:pre-wrap;
		font-size:clamp(1.12rem,4vw,1.45rem);
		line-height:1.85;
		color:#222;
	}

	.bottom{
		position:fixed;
		left:0;
		right:0;
		bottom:0;

		z-index:100;

		display:flex;
		flex-direction:column;
		gap:.75rem;

		padding:.9rem;

		background:
		rgba(255,255,255,.96);

		backdrop-filter:blur(18px);

		border-top:
		1px solid rgba(0,0,0,.08);
	}

	input{

		width:100%;
		height:3.3rem;

		padding:0 1rem;

		border:2px solid #111;
		border-radius:999px;

		font-size:1.05rem;
		font:inherit;
	}

	.categories{

		display:flex;
		gap:.5rem;

		overflow-x:auto;

		scrollbar-width:none;
	}

	.categories::-webkit-scrollbar{
		display:none;
	}

	button{

		border:0;
		border-radius:999px;

		padding:.8rem 1rem;

		font:inherit;
		font-weight:700;

		cursor:pointer;

		white-space:nowrap;
	}

	.categories button{
		background:#e8e8e8;
	}

	button.active{
		background:#111;
		color:white;
	}

	.eye{

		background:#111;
		color:white;

		font-size:1rem;
	}

	.eye.active{
		background:#222;
	}

	.pager{

		display:grid;

		grid-template-columns:
		1fr auto 1fr;

		align-items:center;

		gap:.5rem;
	}

	.pager button{
		background:#111;
		color:white;
	}

	.pager strong{
		text-align:center;
		font-size:1rem;
	}

	button:disabled{
		opacity:.35;
		cursor:not-allowed;
	}

	@media (min-width:768px){

		.content{
			padding:2rem;
			padding-bottom:13rem;
		}

		.bottom{

			left:50%;

			transform:
			translateX(-50%);

			width:min(
				900px,
				calc(100% - 2rem)
			);

			bottom:1rem;

			border-radius:24px;

			box-shadow:
			0 20px 60px rgba(0,0,0,.12);
		}
	}

</style>