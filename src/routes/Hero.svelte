<script lang="ts">
	import { resolve } from '$app/paths'
	import { HeartHandshake, Map, Plus } from '@lucide/svelte'
	import type { Path } from '$app/types'
</script>

<section class="hero flex-row align-center">
	<div class="hero-content w-full">
		<p class="eyebrow flex-row align-center">
			<HeartHandshake size={18} strokeWidth={1.7} />
			<span>Sua voz transforma o caminho</span>
		</p>

		<h1>Uma cidade melhor.<br />Um relato de cada vez.</h1>
		<p class="description">
			Viu um problema na rua? Registre, acompanhe e ajude a tornar os caminhos mais seguros para
			todo mundo.
		</p>

		<div class="actions flex-row align-center">
			<a href={resolve('/relatar' as Path)} class="button button-primary flex-row align-center">
				<Plus size={18} strokeWidth={1.8} />
				<span>Registrar uma ocorrência</span>
			</a>
			<a href={resolve('/relatos' as Path)} class="button button-secondary flex-row align-center">
				<Map size={18} strokeWidth={1.8} />
				<span>Ver no mapa</span>
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 30.5rem;
		padding: 4.5rem 2rem;
		background: var(--color-hero-background);
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		color: var(--color-text);
	}

	.eyebrow {
		gap: 0.6rem;
		margin-bottom: 1.65rem;
		color: var(--color-primary);
		font-size: 0.9rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.5rem, 5vw, 3.3rem);
		font-weight: 700;
		letter-spacing: -0.045em;
		line-height: 1.08;
	}

	.description {
		max-width: 760px;
		margin-top: 1.7rem;
		color: var(--color-muted);
		font-size: 1.15rem;
		line-height: 1.6;
	}

	.actions {
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.6rem;
	}

	.button {
		min-height: 3rem;
		gap: 0.65rem;
		padding: 0 1.2rem;
		border: 1px solid transparent;
		border-radius: 0.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		transition:
			color 160ms ease,
			background-color 160ms ease,
			border-color 160ms ease,
			transform 160ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button-primary {
		background: var(--color-primary);
		color: var(--color-surface);
	}

	.button-primary:hover {
		background: var(--color-text);
	}

	.button-secondary {
		border-color: var(--color-border);
		background: var(--color-surface);
		color: var(--color-primary);
	}

	.button-secondary:hover {
		border-color: var(--color-primary);
		background: var(--color-surface);
	}
</style>
