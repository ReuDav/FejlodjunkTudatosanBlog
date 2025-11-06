<script lang="ts">
	import { onMount } from 'svelte';

	let user: any = null;
	let error = '';
	let loading = true;

	let selectedFile: File | null = null;
	let previewUrl: string | null = null;
	let uploadMessage = '';
	let uploading = false;

	const DEFAULT_AVATAR = 'https://api.fejlodjunktudatosan.hu/images/default_avatar.webp';

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

	// ✅ Kép előnézet generálása
	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			selectedFile = input.files[0];
			previewUrl = URL.createObjectURL(selectedFile);
		}
	}

	// ✅ Kép feltöltése az API-ra
	async function uploadProfileImage() {
		if (!selectedFile) {
			uploadMessage = 'Nincs kiválasztott fájl';
			return;
		}

		const token = localStorage.getItem('jwt_token');
		if (!token) {
			uploadMessage = 'Nincs érvényes token';
			return;
		}

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			uploading = true;
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/user/profilepicture', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			const data = await res.json();

			if (data.status === 'success') {
				uploadMessage = '✅ Feltöltés sikeres!';
				if (user) {
					user.profile_image = data.filename;
				}
			} else {
				uploadMessage = `❌ ${data.message || 'Hiba a feltöltéskor'}`;
			}
		} catch (e) {
			console.error(e);
			uploadMessage = '❌ Hálózati hiba történt.';
		} finally {
			uploading = false;
			selectedFile = null;
		}
	}
</script>

{#if loading}
	<p>Betöltés...</p>
{:else if error}
	<p class="error">{error}</p>
{:else if user}
	<div class="profile-container">
		<div class="profile-header">
			<img
				class="avatar"
				src={
					previewUrl
						? previewUrl
						: user.profile_image
						? `https://api.fejlodjunktudatosan.hu/uploads/profile_images/${user.profile_image}`
						: DEFAULT_AVATAR
				}
				alt="Profilkép"
			/>

			<h2>{user.user_name}</h2>
			<p class="email">{user.email}</p>
			<p class="role">Szerepkör: <strong>{user.user_role}</strong></p>
			<p class="joined">Csatlakozott: {new Date(user.created_at).toLocaleDateString()}</p>
		</div>

		<hr />

		<div class="upload-section">
			<h3>📷 Új profilkép feltöltése</h3>
			<input type="file" accept="image/*" on:change={handleFileChange} />
			<button on:click={uploadProfileImage} disabled={uploading}>
				{uploading ? 'Feltöltés folyamatban...' : 'Feltöltés'}
			</button>

			{#if uploadMessage}
				<p class="message">{uploadMessage}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.profile-container {
		max-width: 500px;
		margin: 2rem auto;
		background: #fff;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--color-theme-1, #007bff);
		margin-bottom: 1rem;
	}

	h2 {
		margin: 0.5rem 0;
	}

	.email {
		color: #555;
	}

	.upload-section {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}

	input[type='file'] {
		font-size: 0.9rem;
	}

	button {
		padding: 0.5rem 1rem;
		background: var(--color-theme-1, #007bff);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		background: #0056b3;
	}

	.message {
		margin-top: 0.5rem;
		color: #333;
	}

	.error {
		color: red;
		text-align: center;
	}
</style>
