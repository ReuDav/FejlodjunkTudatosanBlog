<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { onMount } from 'svelte';

	type Meal = {
		id: number;
		nev: string;
		kategoria: string;
		kaloria: number;
		glutenmentes: boolean;
		ar: number;
	};

	type ApiResponse = {
		status: 'success' | 'error';
		count: number;
		data: Meal[];
	};

	let meals: Meal[] = [];

	onMount(async () => {
		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/index.php', {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			});
			const json: ApiResponse = await res.json();
			if (json.status === 'success') {
				meals = json.data;
			} else {
				console.error('API error:', json);
			}
		} catch (err) {
			console.error('API hiba:', err);
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Hero />

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
</section>
