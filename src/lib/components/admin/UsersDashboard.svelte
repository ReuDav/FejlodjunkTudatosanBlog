<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from "svelte-i18n";
	let users: any[] = [];
	let loading = true;
	let error = '';
	let selectedUser: any = null;
	let editDialog: HTMLDialogElement;
	let deleteDialog: HTMLDialogElement;

	let editedName = '';
	let editedEmail = '';
	let editedRole = '';

	onMount(fetchUsers);

	async function fetchUsers() {
		loading = true;
		error = '';
		try {
			const token = localStorage.getItem('jwt_token');
			const res = await fetch('https://api.fejlodjunktudatosan.hu/api/admin/users/all', {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json'
				}
			});
			const data = await res.json();
			if (data.status === 'success') {
				users = data.users;
			} else {
				error = data.message || 'Hiba történt.';
			}
		} catch (e) {
			error = 'Hálózati hiba';
		} finally {
			loading = false;
		}
	}

	function openEditDialog(user: any) {
		selectedUser = user;
		editedName = user.user_name;
		editedEmail = user.email;
		editedRole = user.user_role;
		editDialog.showModal();
	}

	function openDeleteDialog(user: any) {
		selectedUser = user;
		deleteDialog.showModal();
	}

	async function saveEdit() {
		// Itt jönne az API POST/PATCH
		console.log('Mentés:', selectedUser.id, editedName, editedEmail, editedRole);
		editDialog.close();
	}

	async function confirmDelete() {
		// Itt jönne az API DELETE
		console.log('Törlés:', selectedUser.id);
		deleteDialog.close();
	}
</script>

<section class="dashboard">
	<h1>Admin felhasználókezelő</h1>

	{#if loading}
		<p>Betöltés...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Név</th>
					<th>Email</th>
					<th>Szerepkör</th>
					<th>Regisztráció</th>
					<th>Műveletek</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<tr>
						<td>{user.user_name}</td>
						<td>{user.email}</td>
						<td>{user.user_role}</td>
						<td>{new Date(user.created_at).toLocaleDateString()}</td>
						<td class="actions">
							<button class="edit" on:click={() => openEditDialog(user)}>✏️</button>
							<button class="delete" on:click={() => openDeleteDialog(user)}>🗑️</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<!-- ✏️ Szerkesztés Dialog -->
<dialog bind:this={editDialog} class="dialog-box">
	<h3>Felhasználó szerkesztése</h3>
	<label for=""></label>
	<input type="text" bind:value={editedName} placeholder={$_("admin.users.username")} />
	<input type="email" bind:value={editedEmail} placeholder={$_("admin.users.email")} />
	<select bind:value={editedRole}>
		<option value="user">{$_("admin.users.roles.user")}</option>
		<option value="admin">{$_("admin.users.roles.admin")}</option>
	</select>
	<div class="dialog-actions">
		<button class="yes" on:click={saveEdit}>Mentés</button>
		<button class="no" on:click={() => editDialog.close()}>Mégsem</button>
	</div>
</dialog>

<!-- 🗑️ Törlés Dialog -->
<dialog bind:this={deleteDialog} class="dialog-box">
	<h3>Biztosan törölni szeretnéd <span>{selectedUser?.user_name}</span> felhasználót?</h3>
	<div class="dialog-actions">
		<button class="yes" on:click={confirmDelete}>Igen, törlés</button>
		<button class="no" on:click={() => deleteDialog.close()}>Mégsem</button>
	</div>
</dialog>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 2rem auto;
		padding: 1rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		background: white;
		border-radius: 8px;
		overflow: hidden;
	}

	th, td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		background-color: #f8f8f8;
		font-weight: bold;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	button.edit {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		cursor: pointer;
	}

	button.delete {
		background-color: #dc3545;
		color: white;
		border: none;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		cursor: pointer;
	}

	button.edit:hover {
		background-color: #0056b3;
	}

	button.delete:hover {
		background-color: #c82333;
	}

	/* DIALOG */

	.dialog-box {
		border: none;
		border-radius: 10px;
		padding: 2rem;
		width: 100%;
		max-width: 400px;
		text-align: center;
		margin: auto;
	}

	.dialog-box::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.dialog-box input,
	.dialog-box select {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.dialog-actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.dialog-actions .yes {
		background-color: #28a745;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.dialog-actions .no {
		background-color: #6c757d;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.dialog-actions .yes:hover {
		background-color: #218838;
	}

	.dialog-actions .no:hover {
		background-color: #5a6268;
	}

	.error {
		color: red;
		text-align: center;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		table, thead, tbody, th, td, tr {
			display: block;
		}

		th {
			display: none;
		}

		td {
			padding: 0.5rem;
			border: none;
			border-bottom: 1px solid #eee;
		}

		td::before {
			content: attr(data-label);
			font-weight: bold;
			display: block;
			color: #555;
		}
	}
</style>
