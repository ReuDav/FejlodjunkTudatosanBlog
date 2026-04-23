<!-- src/routes/admin/+layout.svelte -->
<script>
	import { page } from '$app/stores';
</script>

<div class="admin-layout">
	<aside class="sidebar">
		<h2>Admin</h2>
		<nav>
			<a href="/admin/users" class={$page.url.pathname === '/admin/users' ? 'active' : ''}>👤 Felhasználók</a>
			<a href="/admin/blog/create" class={$page.url.pathname === '/admin/blog/create' ? 'active' : ''}>📝 Blog feltöltés</a>
		</nav>
	</aside>

	<main>
		<slot />
	</main>
</div>

<style>
	.admin-layout {
		display: flex;
		min-height: 100vh;
	}

	.sidebar {
		width: 220px;
		background: #f8f8f8;
		padding: 2rem 1rem;
		box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
	}

	.sidebar nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.sidebar a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
	}

	.sidebar a.active {
		color: var(--color-theme-1, #007bff);
		font-weight: bold;
	}
</style>
