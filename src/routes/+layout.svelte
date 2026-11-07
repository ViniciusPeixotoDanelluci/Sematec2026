<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Path } from '$app/types'
	import { StarCheck } from '@lucide/svelte'
	import type { LayoutProps } from './$types'
	import './common.css'


	let { children }: LayoutProps = $props()
</script>

<div>
	<header class="flex-row justify-between align-center w-full">
		<div class="flex-row">
			<StarCheck />
			<div class="flex-col">
				<h3>Nome Do Site</h3>
				<span>Mini Descrição</span>
			</div>
		</div>
		<nav>
			<ul>
				<li>
					<a role="button" href={resolve('/' as Path)}>Feed</a>
					<a role="button" href={resolve('/alertas' as Path)}>Denuncias</a>
					<a role="button" href={resolve('/cadastro' as Path)}>Cadastrar denúncia</a>
					<a role="button" href={resolve('/contato' as Path)}>Contato</a>
				</li>
			</ul>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>

<style>
	header {
		/* height: 3rem; */
		padding: 1.15rem;
		border-bottom: 2px solid #a2a78c;
	}

	h3 {
		margin: 0;
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	span {
		font-size: small;
	}
</style>
