<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let user = '';
	let password = '';
	let error = '';
	let loading = false;
	let rememberMe = false;

	async function login() {
		error = '';
		loading = true;

		try {
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ user, password }),
				credentials: 'include'
			});

			const data = await res.json();

			if (!res.ok || data.status === 'error') {
				error = data.message || 'Hiba történt';
			} else {
				// 🔐 Token mentése (30 napra, ha kell)
				if (data.jwt_token) {
					if (rememberMe) {
						localStorage.setItem('jwt_token', data.jwt_token);
					} else {
						sessionStorage.setItem('jwt_token', data.jwt_token);
					}
				}

				const currentLocale = get(locale);
				const userRole = data.user?.role || data.role || 'user';

				const path =
					userRole === 'admin'
						? `/${currentLocale}/admin`
						: `/${currentLocale}/${$_('routes.profile')}`;

				goto(path);
			}
		} catch (err) {
			error = 'Hálózati hiba';
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={login} class="auth-form">
	<h2>{$_('login.title')}</h2>

	<label>
		{$_('login.user')}
		<input type="text" bind:value={user} required />
	</label>

	<label>
		{$_('login.password')}
		<input type="password" bind:value={password} required minlength="6" />
	</label>

	<label class="remember-me">
		<input type="checkbox" bind:checked={rememberMe} />
		{$_('login.remember')}
	</label>

	<button type="submit" disabled={loading}>
		{#if loading}
			{$_('login.loading')}
		{:else}
			{$_('login.submit')}
		{/if}
	</button>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</form>

<style>
	:root {
		--color-theme-1: #ff7a00;
	}

	input[type='checkbox'] {
		accent-color: var(--color-theme-1, #ff7a00);
		outline: none;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #fafafa;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	h2 {
		margin-bottom: 1rem;
		text-align: center;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
	}

	input[type='text'],
	input[type='password'] {
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.remember-me {
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		font-weight: normal;
	}

	button {
		padding: 0.75rem;
		background: var(--color-theme-1, #ff7a00);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		transition: background 0.2s ease;
	}

	button:hover {
		background: #e86d00;
	}

	.error {
		color: red;
		text-align: center;
	}
</style>
