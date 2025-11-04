<!-- src/lib/components/RegisterForm.svelte -->
<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let user_name = '';
	let email = '';
	let password = '';
	let success = false;
	let error = '';

	async function register() {
		error = '';
		success = false;

		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ user_name, email, password })
			});

			const data = await res.json();

			if (!res.ok || data.status === 'error') {
				error = data.message || 'Hiba történt';
			} else {
				success = true;
				user_name = '';
				email = '';
				password = '';
			}
		} catch (e) {
			error = 'Hálózati hiba';
			console.error(e);
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

	<button type="submit">{$_('register.submit')}</button>

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
