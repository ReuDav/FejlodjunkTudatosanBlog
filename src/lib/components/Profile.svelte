<script lang="ts">
	import { onMount } from 'svelte';

	let user: any = null;
	let error = '';
	let loading = true;

	onMount(async () => {
		const token = localStorage.getItem('jwt_token');

		if (!token) {
			error = 'Nincs bejelentkezett felhasználó';
			loading = false;
			return;
		}

		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/user/me', {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json'
				}
			});

			const data = await res.json();

			if (data.status === 'success') {
				user = data.user;
			} else {
				error = data.message || 'Ismeretlen hiba';
			}
		} catch (e) {
			error = 'Nem sikerült lekérni a felhasználó adatokat.';
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Betöltés...</p>
{:else if error}
	<p class="error">{error}</p>
{:else if user}
	<div class="user-card">
		<h2>{user.user_name}</h2>
		<p><strong>Email:</strong> {user.email}</p>
		<p><strong>Szerepkör:</strong> {user.user_role}</p>
		<p><strong>Csatlakozott:</strong> {new Date(user.created_at).toLocaleString()}</p>
	</div>
{/if}

<style>
	.user-card {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 6px;
		background-color: #fafafa;
		max-width: 400px;
		margin: 1rem auto;
	}
	.error {
		color: red;
		text-align: center;
	}
</style>
