<script lang="ts">
	import { page } from '$app/state'
	import { resolve } from '$app/paths'
	import { MapPin } from '@lucide/svelte'
	import type { LayoutProps } from './$types'
	import type { Path } from '$app/types'
	import './common.css'

	let { children }: LayoutProps = $props()
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

<div class="app flex-col">
	<header class="site-header flex-row justify-between align-center">
		<a class="brand flex-row align-center" href={resolve('/' as Path)}>
			<span class="brand-icon"><MapPin size={14} strokeWidth={2} /></span>
			<span>FiscalizaJá</span>
		</a>
		<nav class="site-nav">
			<ul class="flex-row align-center">
				<li>
					<a
						class="flex-row align-center"
						class:active={page.url.pathname === resolve('/' as Path)}
						href={resolve('/' as Path)}>Início</a
					>
				</li>
				<li>
					<a
						class="flex-row align-center"
						class:active={page.url.pathname === resolve('/relatos' as Path)}
						href={resolve('/relatos' as Path)}>Feed</a
					>
				</li>
				<li>
					<a class="flex-row align-center" href={resolve('/relatar' as Path)}>Relatar</a>
				</li>
				<li>
					<a
						class="flex-row align-center"
						class:active={page.url.pathname === resolve('/contato' as Path)}
						href={resolve('/contato' as Path)}>Contato</a
					>
				</li>
			</ul>
		</nav>
	</header>

	<main class="flex-row">
		{@render children()}
	</main>
</div>

<style>
	.app {
		height: 100dvh;
	}

	.site-header {
		flex-shrink: 0;
		height: 4rem;
		padding: 0 1.75rem;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
	}

	.brand {
		gap: 0.35rem;
		color: inherit;
		font-size: 1.5rem;
		font-weight: 500;
		white-space: nowrap;
		transition:
			color 160ms ease,
			transform 160ms ease;
	}

	.site-header a:hover {
		transform: translateY(-1px);
		color: var(--color-primary);
	}

	.brand-icon {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border-radius: 0.35rem;
		background: var(--color-primary);
		color: var(--color-surface);
	}

	.site-nav ul {
		gap: 1.1rem;
		height: 3.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.site-nav a {
		height: 100%;
		border-bottom: 2px solid transparent;
		color: var(--color-muted);
		font-size: 0.85rem;
		white-space: nowrap;
		transition:
			color 160ms ease,
			border-color 160ms ease,
			transform 160ms ease;
	}

	.site-nav a.active {
		border-bottom-color: var(--color-primary);
		color: var(--color-primary);
	}

	@media (max-width: 480px) {
		.site-header {
			gap: 0.75rem;
			padding: 0 1rem;
		}

		.site-nav ul {
			gap: 0.7rem;
		}

		.site-nav a {
			font-size: 0.75rem;
		}

		.brand {
			font-size: 0.9rem;
		}
	}

	main {
		flex: 1;
		min-height: 0;
	}
</style>
