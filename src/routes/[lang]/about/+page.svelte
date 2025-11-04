<script>
	import { onMount } from 'svelte';
	let meals = [];

	onMount(async () => {
		const res = await fetch("https://api.fejlodjunktudatosan.hu");
		const json = await res.json();
		meals = json.data; // <- itt kapod meg a listát
	});
</script>

<h2>Étlap</h2>

{#if meals.length}
	<ul>
		{#each meals as meal}
			<li>
				<h3>{meal.nev}</h3>
				<p><strong>Kategória:</strong> {meal.kategoria}</p>
				<p><strong>Kalória:</strong> {meal.kaloria} kcal</p>
				<p><strong>Gluténmentes:</strong> {meal.glutenmentes ? 'Igen' : 'Nem'}</p>
				<p><strong>Ár:</strong> {meal.ar} Ft</p>
			</li>
		{/each}
	</ul>
{:else}
	<p>Betöltés...</p>
{/if}
