<script>
	import { _, locale } from 'svelte-i18n';
	import emailjs from 'emailjs-com';

	let name = '';
	let email = '';
	let message = '';
	let status = '';

	const SERVICE_ID = 'service_ob75l2r';
	const TEMPLATE_ID = 'template_cegvjjq';
	const PUBLIC_KEY = 't8X0J3ziyf5y9v3LB';
	async function handleSubmit(e) {
		e.preventDefault();
		status = '';

		try {
			const result = await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				{
					name,
					email,
					message
				},
				PUBLIC_KEY
			);

			console.log('SUCCESS!', result.text);
			status = 'success';
			name = email = message = '';
		} catch (error) {
			console.error('FAILED...', error);
			status = 'error';
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

		<button type="submit">{$_('contact.send')}</button>

		{#if status === 'success'}
			<p class="success">{$_('contact.success')}</p>
		{:else if status === 'error'}
			<p class="error">{$_('contact.error')}</p>
		{/if}
	</form>
</section>

<style>
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

	button:hover {
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
