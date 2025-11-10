<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import emailjs from 'emailjs-com';

	let name = '';
	let email = '';
	let message = '';
	let status: 'success' | 'error' | '' = '';
	let errorMessage = '';
	let sending = false;

	const SERVICE_ID = 'service_ob75l2r';
	const TEMPLATE_ID = 'template_cegvjjq';
	const PUBLIC_KEY = 't8X0J3ziyf5y9v3LB';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		status = '';
		errorMessage = '';
		sending = true;

		try {
			// 1️⃣ Először adatbázisba mentjük az API-n keresztül
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/contact/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			const db = await res.json();

			if (!res.ok || db.status !== 'success') {
				throw new Error(db.message || 'Adatbázis hiba történt.');
			}

			// 2️⃣ Ezután küldjük el az emailt is EmailJS-sel
			await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				{ name, email, message },
				PUBLIC_KEY
			);

			status = 'success';
			name = '';
			email = '';
			message = '';
		} catch (err) {
			console.error('Küldési hiba:', err);
			status = 'error';
			errorMessage = err.message || 'Ismeretlen hiba történt.';
		} finally {
			sending = false;
		}
	}
</script>

<section class="contact">
	<h1>{$_('contact.title')}</h1>
	<p>{$_('contact.subtitle')}</p>

	<form on:submit|preventDefault={handleSubmit}>
		<label>
			{$_('contact.name')}
			<input type="text" bind:value={name} required />
		</label>

		<label>
			{$_('contact.email')}
			<input type="email" bind:value={email} required />
		</label>

		<label>
			{$_('contact.message')}
			<textarea bind:value={message} rows="5" required></textarea>
		</label>

		<button type="submit" disabled={sending}>
			{sending ? $_('contact.sending') : $_('contact.send')}
		</button>

		{#if status === 'success'}
			<p class="success">{$_('contact.success')}</p>
		{:else if status === 'error'}
			<p class="error">{$_('contact.error')}</p>
		{/if}
	</form>
</section>

<style>
	h1, p {
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 500px;
		margin: 2rem auto;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: 600;
		color: var(--color-text);
	}

	input,
	textarea {
		padding: 0.75rem 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
		font-family: inherit;
	}

	button {
		padding: 0.75rem 1.5rem;
		background-color: var(--color-theme-1);
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		align-self: flex-start;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	button:hover:enabled {
		background-color: var(--color-theme-2);
	}

	.success {
		color: green;
		font-weight: 600;
	}

	.error {
		color: red;
		font-weight: 600;
	}
</style>
