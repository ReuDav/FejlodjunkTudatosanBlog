<script>
	import { onMount } from 'svelte';

	let meals = [];
	onMount(async () => {
		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api.php', {
				method: 'GET',
				credentials: 'include' // CORS miatt kell, ha backend is Allow-Credentials-t küld
			});
			const json = await res.json();
			meals = json.data;
		} catch (err) {
			console.error('API hiba:', err);
		}
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
