<script lang="ts">
	import favicon from '#lib/assets/favicon.svg'
	import type { LayoutProps } from './$types'
	import './common.css'

	let { children }: LayoutProps = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<header>

	</header>
	
	{@render children()}
</div>

<style>
	header {
		/* height: 3rem; */
		padding: 1.15rem;
		border-bottom: 2px solid #a2a78c;
	}
</style>
