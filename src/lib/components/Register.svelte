<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let user_name = '';
	let email = '';
	let password = '';
	let success = false;
	let error = '';
	let loading = false; // 🔄 új változó

	async function register() {
		error = '';
		success = false;
		loading = true;

		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ user_name, email, password }),
				credentials: 'include'
			});

			const data = await res.json();

			if (!res.ok || data.status === 'error') {
				error = data.message || 'Hiba történt';
			} else {
				success = true;
				user_name = '';
				email = '';
				password = '';

				// 🔁 Lokalizált átirányítás
				const currentLocale = get(locale);
				const loginPath = currentLocale === 'hu' ? '/hu/bejelentkezes' : '/en/login';

				setTimeout(() => goto(loginPath), 1000);
			}
		} catch (e) {
			error = 'Hálózati hiba';
			console.error(e);
		} finally {
			loading = false; // ✅ visszakapcsoljuk a gombot
		}
	}
</script>

<form on:submit|preventDefault={register} class="register-form">
	<h2>{$_('register.title')}</h2>

	<label>
		{$_('register.username')}
		<input type="text" bind:value={user_name} required />
	</label>

	<label>
		{$_('register.email')}
		<input type="email" bind:value={email} required />
	</label>

	<label>
		{$_('register.password')}
		<input type="password" bind:value={password} required minlength="6" />
	</label>

	<button type="submit" disabled={loading}>
		{#if loading}
			{$_('register.loading') ?? '...'}
		{:else}
			{$_('register.submit')}
		{/if}
	</button>

	{#if success}
		<p class="success">{$_('register.success')}</p>
	{:else if error}
		<p class="error">{error}</p>
	{/if}
</form>

<style>
	.register-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 2rem auto;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
	}

	input {
		padding: 0.5rem;
		font-size: 1rem;
	}

	button {
		padding: 0.75rem;
		background: var(--color-theme-1, #007bff);
		color: white;
		border: none;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		background: #0056b3;
	}

	.success {
		color: green;
	}

	.error {
		color: red;
	}
</style>
