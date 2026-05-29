<script lang="ts">
	let message = $state('');
	let files = $state<FileList | null>(null);
	let answer = $state('');
	let error = $state('');
	let loading = $state(false);

	async function send() {
		if (!message.trim() && (!files || files.length === 0)) return;

		loading = true;
		answer = '';
		error = '';

		const form = new FormData();
		form.append('message', message);

		if (files) {
			for (const file of files) {
				form.append('files', file);
			}
		}

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				body: form
			});

			const data = await res.json();

			if (!res.ok) {
				error = data.error ?? 'Hiba történt.';
				return;
			}

			answer = data.answer;
			message = '';
			files = null;
		} catch {
			error = 'Nem sikerült elküldeni az üzenetet.';
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<section class="chat">
		<h1>C# Mentor Chat</h1>

		<div class="box">
			<textarea
				bind:value={message}
				placeholder="Írd be a kérdésed..."
				rows="5"
			></textarea>

			<div class="actions">
				<label>
					Fájlok
					<input
						type="file"
						multiple
						accept="image/*,.pdf,.txt,.csv,.json,.md,.js,.ts,.html,.css,.php,.cs"
						onchange={(e) => (files = e.currentTarget.files)}
					/>
				</label>

				<button onclick={send} disabled={loading}>
					{loading ? 'Küldés...' : 'Küldés'}
				</button>
			</div>
		</div>

		{#if files && files.length > 0}
			<p class="files">{files.length} fájl kiválasztva</p>
		{/if}

		{#if error}
			<p class="error">{error}</p>
		{/if}

		{#if answer}
			<article>{answer}</article>
		{/if}
	</section>
</main>

<style>
	main {
		min-height: calc(100vh - 100px);
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.chat {
		width: min(100%, 48rem);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 5vw, 3rem);
	}

	.box {
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 1rem;
		overflow: hidden;
		background: white;
	}

	textarea {
		width: 100%;
		border: 0;
		resize: vertical;
		padding: 1rem;
		font: inherit;
		outline: none;
		box-sizing: border-box;
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}

	label {
		cursor: pointer;
		font-size: 0.9rem;
	}

	input[type='file'] {
		display: none;
	}

	button {
		border: 0;
		border-radius: 999px;
		padding: 0.7rem 1.2rem;
		background: black;
		color: white;
		font: inherit;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.files {
		margin: 0;
		font-size: 0.9rem;
		opacity: 0.7;
	}

	.error {
		color: crimson;
		margin: 0;
	}

	article {
		white-space: pre-wrap;
		line-height: 1.6;
		padding: 1rem;
		border-radius: 1rem;
		background: rgba(0, 0, 0, 0.04);
	}
</style>