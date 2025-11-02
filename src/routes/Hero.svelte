<script lang="ts">
	import { onMount } from 'svelte';
	import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
	import * as THREE from 'three';
	import { setupI18n } from '$lib/i18n/i18n';
	import { _ } from 'svelte-i18n';
	setupI18n();

	let canvasContainer: HTMLDivElement;
	let loading = $state(true);
	let speed = $state(0.01); // forgási sebesség

	let hover = false;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			canvasContainer.clientWidth / canvasContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 100, 80); // közelebb és enyhén felülről
		camera.lookAt(0, 40, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		canvasContainer.appendChild(renderer.domElement);

		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 100, 100).normalize();
		scene.add(light);

		const loader = new FBXLoader();
		let model: THREE.Group;

		loader.load('/hero.fbx', (fbx: THREE.Group) => {
			model = fbx;
			model.scale.set(1.25, 1.25, 1.25); // nagyobb
			model.position.set(0, 0, 0); // középen
			scene.add(model);
			loading = false;
		});

		function animate() {
			requestAnimationFrame(animate);
			if (model) {
				model.rotation.y += hover ? 0.05 : speed;
			}
			renderer.render(scene, camera);
		}

		animate();

		const handleMouseEnter = () => (hover = true);
		const handleMouseLeave = () => (hover = false);

		canvasContainer.addEventListener('mouseenter', handleMouseEnter);
		canvasContainer.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			canvasContainer.removeEventListener('mouseenter', handleMouseEnter);
			canvasContainer.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<main>
	<section>
		<div>
			<h1>{$_('hero.title')}</h1>
			<p>
				{@html $_('hero.subtitle')}
			</p>
		</div>
		<div class="canvas-wrapper">
			{#if loading}
				<div class="spinner">Töltés...</div>
			{/if}
			<div bind:this={canvasContainer} class="canvas-container"></div>
		</div>
	</section>
</main>

<style>
main {
	height: calc(100vh - 100px);
	display: flex;
	align-items: center;
	justify-content: center;
}

section {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	width: 100%;
	max-width: 64rem;
	margin: 0 auto;
	box-sizing: border-box;
	height: 100%; /* ÚJ: hogy a gyerekek arányosak legyenek */
}

/* Szöveg + canvas konténerek */
section > div {
	flex: 1 1 300px;
	box-sizing: border-box;
	padding: 1rem;
}

.canvas-wrapper {
	position: relative;
	width: 100%;
	aspect-ratio: 1 / 1;
}

.canvas-container {
	width: 100%;
	height: 100%;
}

.spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.2rem;
	color: #333;
}

/* ======= RESPONSIVE - max 768px ======= */
@media (max-width: 768px) {
	main {
		height: calc(100vh - 100px);
	}

	section {
		flex-direction: column;
		height: 100%;
		padding: 0.5rem 1rem;
	}

	section > div {
		flex: 1 1 auto;
		width: 100%;
		padding: 0.5rem 0;
	}

	/* A canvas most max 55% magasságot kap */
	.canvas-wrapper {
		aspect-ratio: unset;
		height: 55%;
	}

	.canvas-container {
		height: 100%;
	}
}

</style>
