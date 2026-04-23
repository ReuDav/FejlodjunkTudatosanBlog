<script lang="ts">
	import { tick } from 'svelte';
	import Highlight from 'svelte-highlight';
	import python from 'svelte-highlight/languages/python';
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark';

	type CategoryKey = 'alapveto' | 'kereses' | 'rendezes';

	type LibraryItem = {
		label: string;
		fn: string;
		code: string;
	};

	const categories: {
		key: CategoryKey;
		label: string;
		items: LibraryItem[];
	}[] = [
		{
			key: 'alapveto',
			label: 'Alapvető',
			items: [
				{
					label: 'Összegzés tétele',
					fn: 'osszegzes_tetel',
					code: `def osszegzes_tetel(julcsika):
    osszeg = 0
    for szam in julcsika:
        osszeg += szam
    return osszeg`
				},
				{
					label: 'Kiválogatás tétele',
					fn: 'kivalogatas',
					code: `def kivalogatas(bemeneti_lista, hatarertek):
    valogatott_szamok = []
    for i in bemeneti_lista:
        if i < hatarertek:
            valogatott_szamok.append(i)
    return valogatott_szamok`
				},
				{
					label: 'Megszámlálás tétele',
					fn: 'megszamlalas',
					code: `def megszamlalas(adathalmaz):
    darab = 0
    for szam in adathalmaz:
        darab += 1
    return darab`
				},
				{
					label: 'Eldöntés tétele',
					fn: 'eldontes',
					code: `def eldontes(adathalmaz, keresett_szam):
    for elem in adathalmaz:
        if elem == keresett_szam:
            return True
    return False`
				},
				{
					label: 'Kiválasztás tétele',
					fn: 'kivalasztas',
					code: `def kivalasztas(szoveg, keresett_betu):
    index = 0
    for betu in szoveg:
        if betu == keresett_betu:
            return index
        index += 1
    return -1`
				},
				{
					label: 'Szétválogatás tétele',
					fn: 'szetvalogatas',
					code: `def szetvalogatas(adathalmaz):
    pozitivak = []
    negativak = []

    for szam in adathalmaz:
        if szam > 0:
            pozitivak.append(szam)
        elif szam < 0:
            negativak.append(szam)

    return pozitivak, negativak`
				},
				{
					label: 'Metszet tétele',
					fn: 'metszet',
					code: `def metszet(adathalmaz1, adathalmaz2):
    kozosek = []
    for elem1 in adathalmaz1:
        for elem2 in adathalmaz2:
            if elem1 == elem2 and elem1 not in kozosek:
                kozosek.append(elem1)

    return kozosek`
				},
				{
					label: 'Összefuttatás tétele',
					fn: 'osszefuttatas',
					code: `def osszefuttatas(lista1, lista2):
    unio = []

    i, j = 0, 0
    while i < len(lista1) and j < len(lista2):
        if lista1[i] < lista2[j]:
            unio.append(lista1[i])
            i += 1
        elif lista1[i] == lista2[j]:
            unio.append(lista1[i])
            i += 1
            j += 1
        else:
            unio.append(lista2[j])
            j += 1

    while i < len(lista1):
        unio.append(lista1[i])
        i += 1

    while j < len(lista2):
        unio.append(lista2[j])
        j += 1

    return unio`
				}
			]
		},
		{
			key: 'kereses',
			label: 'Keresés',
			items: [
				{
					label: 'Lineáris keresés',
					fn: 'linearis_kereses',
					code: `def linearis_kereses(lista, keresett_ertek):
    for i in range(len(lista)):
        if lista[i] == keresett_ertek:
            return i
    return -1`
				},
				{
					label: 'Lineáris keresés while',
					fn: 'linearis_kereses_while',
					code: `def linearis_kereses_while(lista, keresett_ertek):
    n = len(lista)
    i = 0
    while i < n and lista[i] != keresett_ertek:
        i += 1
    return i if i < n else -1`
				},
				{
					label: 'Strázsás keresés',
					fn: 'strazsas_kereses',
					code: `def strazsas_kereses(lista, keresett_ertek):
    lista.append(keresett_ertek)
    i = 0

    while lista[i] != keresett_ertek:
        i += 1

    lista.pop()

    if i < len(lista):
        return i
    else:
        return -1`
				},
				{
					label: 'Rendezett lineáris keresés',
					fn: 'linearis_kereses_rendezett',
					code: `def linearis_kereses_rendezett(lista, keresett):
    n = len(lista)
    i = 0
    while i < n and lista[i] < keresett:
        i += 1

    if i < n and lista[i] == keresett:
        return i
    return -1`
				},
				{
					label: 'Bináris keresés',
					fn: 'binaris_kereses',
					code: `def binaris_kereses(lista, keresett):
    also = 0
    felso = len(lista) - 1

    while also <= felso:
        kozep = (also + felso) // 2

        if lista[kozep] == keresett:
            return kozep
        elif lista[kozep] < keresett:
            also = kozep + 1
        else:
            felso = kozep - 1

    return -1`
				},
				{
					label: 'Ugró keresés',
					fn: 'ugro_kereses',
					code: `import math

def ugro_kereses(lista, keresett):
    n = len(lista)
    ugras = int(math.sqrt(n))
    elozo = 0

    while lista[min(ugras, n) - 1] < keresett:
        elozo = ugras
        ugras += int(math.sqrt(n))
        if elozo >= n:
            return -1

    while lista[elozo] < keresett:
        elozo += 1
        if elozo == min(ugras, n):
            return -1

    if lista[elozo] == keresett:
        return elozo

    return -1`
				}
			]
		},
		{
			key: 'rendezes',
			label: 'Rendezés',
			items: [
				{
					label: 'Beszúró rendezés',
					fn: 'beszuro_rendezes',
					code: `def beszuro_rendezes(sorozat):
    for i in range(1, len(sorozat)):
        kulcs = sorozat[i]
        j = i - 1

        while j >= 0 and kulcs < sorozat[j]:
            sorozat[j + 1] = sorozat[j]
            j -= 1

        sorozat[j + 1] = kulcs
    return sorozat`
				},
				{
					label: 'Buborék rendezés',
					fn: 'buborekrendezes',
					code: `def buborekrendezes(sorozat):
    n = len(sorozat)
    for i in range(n):
        volt_csere = False
        for j in range(0, n - i - 1):
            if sorozat[j] > sorozat[j + 1]:
                sorozat[j], sorozat[j + 1] = sorozat[j + 1], sorozat[j]
                volt_csere = True
        if not volt_csere:
            break
    return sorozat`
				},
				{
					label: 'Kiválasztásos rendezés',
					fn: 'kivalasztasos_rendezes',
					code: `def kivalasztasos_rendezes(sorozat):
    n = len(sorozat)
    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if sorozat[j] < sorozat[min_index]:
                min_index = j
        sorozat[i], sorozat[min_index] = sorozat[min_index], sorozat[i]
    return sorozat`
				},
				{
					label: 'Fésűs rendezés',
					fn: 'fesus_rendezes',
					code: `def fesus_rendezes(sorozat):
    n = len(sorozat)
    res = n
    volt_csere = True

    while res != 1 or volt_csere:
        res = max(1, (res * 10) // 13)
        volt_csere = False

        for i in range(0, n - res):
            if sorozat[i] > sorozat[i + res]:
                sorozat[i], sorozat[i + res] = sorozat[i + res], sorozat[i]
                volt_csere = True
    return sorozat`
				},
				{
					label: 'Koktél rendezés',
					fn: 'koktel_rendezes',
					code: `def koktel_rendezes(sorozat):
    n = len(sorozat)
    volt_csere = True
    elso, utolso = 0, n - 1

    while volt_csere:
        volt_csere = False

        for i in range(elso, utolso):
            if sorozat[i] > sorozat[i + 1]:
                sorozat[i], sorozat[i + 1] = sorozat[i + 1], sorozat[i]
                volt_csere = True

        if not volt_csere:
            break

        utolso -= 1
        volt_csere = False

        for i in range(utolso - 1, elso - 1, -1):
            if sorozat[i] > sorozat[i + 1]:
                sorozat[i], sorozat[i + 1] = sorozat[i + 1], sorozat[i]
                volt_csere = True

        elso += 1

    return sorozat`
				},
				{
					label: 'Gyorsrendezés',
					fn: 'gyors_rendezes',
					code: `def particionalas(sorozat, also, felso):
    i = also - 1
    pivot = sorozat[felso]

    for j in range(also, felso):
        if sorozat[j] < pivot:
            i += 1
            sorozat[i], sorozat[j] = sorozat[j], sorozat[i]

    sorozat[i + 1], sorozat[felso] = sorozat[felso], sorozat[i + 1]
    return i + 1

def gyors_rendezes(sorozat, also, felso):
    if also < felso:
        pi = particionalas(sorozat, also, felso)
        gyors_rendezes(sorozat, also, pi - 1)
        gyors_rendezes(sorozat, pi + 1, felso)

    return sorozat`
				}
			]
		}
	];

	let activeCategory: CategoryKey = 'alapveto';
	let selectedItem: LibraryItem | null = null;
	let codeDialog: HTMLDialogElement;

	$: activeItems = categories.find((category) => category.key === activeCategory)?.items ?? [];

	function selectCategory(categoryKey: CategoryKey) {
		activeCategory = categoryKey;
	}

	async function openDialog(item: LibraryItem) {
		selectedItem = item;
		await tick();
		codeDialog?.showModal();
	}

	function closeDialog() {
		codeDialog?.close();
		selectedItem = null;
	}
</script>

<svelte:head>
	{@html atomOneDark}
</svelte:head>

<div class="page">
	<div class="content">
		<h1>Programozási tételek és algoritmusok</h1>

		<div class="subnav">
			{#each activeItems as item}
				<button class="item-button" on:click={() => openDialog(item)}>
					{item.label}
				</button>
			{/each}
		</div>
	</div>

	<nav class="bottom-nav">
		{#each categories as category}
			<button
				class:active={activeCategory === category.key}
				on:click={() => selectCategory(category.key)}
			>
				{category.label}
			</button>
		{/each}
	</nav>

	<dialog bind:this={codeDialog} class="code-dialog">
		{#if selectedItem}
			<div class="dialog-content">
				<h2>{selectedItem.label}</h2>
				<p class="function-name">{selectedItem.fn}</p>

				<Highlight language={python} code={selectedItem.code} style={"font-size: 2rem;"}/>
				<button class="back-button" on:click={closeDialog}> Vissza </button>
			</div>
		{/if}
	</dialog>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #0f172a;
		color: white;
	}

	.page {
		min-height: 100vh;
		padding-bottom: 220px;
		box-sizing: border-box;
	}

	.content {
		padding: 1rem;
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 1rem;
		font-size: clamp(1.4rem, 3vw, 2rem);
	}

	.subnav {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.item-button {
		width: 100%;
		border: none;
		border-radius: 12px;
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
		font-weight: 700;
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

	.dialog-content h2 {
		margin: 0;
		font-size: 1.4rem;
	}

	.function-name {
		margin: 0.25rem 0 1rem 0;
		color: #93c5fd;
		font-family: monospace;
		font-size: 0.95rem;
	}

	pre {
		margin: 0 0 1rem 0;
		padding: 1rem;
		border-radius: 12px;
		background: #020617;
		overflow: auto;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.back-button {
		border: none;
		border-radius: 12px;
		padding: 0.8rem 1rem;
		background: #2563eb;
		color: white;
		font-weight: 700;
		cursor: pointer;
	}

	.back-button:hover {
		background: #1d4ed8;
	}

	@media (max-height: 800px) {
		.page {
			padding-bottom: 240px;
		}
	}

	@media (max-width: 640px) {
		.content {
			padding: 0.75rem;
		}

		.item-button,
		.bottom-nav button {
			font-size: 0.95rem;
			padding: 0.8rem 0.9rem;
		}

		pre {
			font-size: 0.85rem;
		}
	}
</style>
