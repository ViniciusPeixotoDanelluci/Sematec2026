<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left'
	import ChevronRight from '@lucide/svelte/icons/chevron-right'
	import { TipoDeObstaculos } from '#lib/types/obstacle-category-type.ts'
	import { AlertStatus } from '#lib/types/alerta-status.type.ts'

	type Alert = {
		title: string
		description: string
		category: TipoDeObstaculos
		neighborhood: string
		street: string
		status: AlertStatus
	}

	const alerts: Alert[] = [
		{
			title: 'Buraco na pista',
			description: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.',
			category: TipoDeObstaculos.HOLE,
			neighborhood: 'Centro',
			street: 'Rua São João de Miriti',
			status: AlertStatus.STANDBY
		},
		{
			title: 'Poste com lâmpada apagada',
			description: 'A rua está sem iluminação durante a noite.',
			category: TipoDeObstaculos.LIGHTINING,
			neighborhood: 'Itapecirica da Serra',
			street: 'Rua 3',
			status: AlertStatus.STANDBY
		},
		{
			title: 'Descarte irregular de lixo',
			description: 'Há sacos de lixo acumulados na calçada.',
			category: TipoDeObstaculos.GARBAGE,
			neighborhood: 'Av. Getúlio Vargas',
			street: 'Rua 4',
			status: AlertStatus.STANDBY
		},
		{
			title: 'Calçada danificada',
			description: 'Trecho quebrado pode dificultar a passagem de pedestres.',
			category: TipoDeObstaculos.SIDEWALK,
			neighborhood: 'Flores Cavalcante',
			street: 'Rua 5',
			status: AlertStatus.STANDBY
		}
	]

	let track: HTMLUListElement
	let atStart = $state(true)
	let atEnd = $state(false)

	//making the arrow follow user's scroll
	function updateArrows() {
		if (!track) return
		atStart = track.scrollLeft <= 1
		atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
	}

	//"sweeping" the carousel
	function scrollPage(direction: -1 | 1) {
		track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
	}

	$effect(() => {
		updateArrows()
	})
</script>

<section class="flex-row align-center pagination" aria-label="Alertas recentes">
	<!-- left arrow -->
	<button
		type="button"
		class="arrow"
		aria-label="Alertas anteriores"
		disabled={atStart}
		onclick={() => scrollPage(-1)}
	>
		<ChevronLeft />
	</button>

	<!-- carousel function -->
	<ul class="track" bind:this={track} onscroll={updateArrows}>
		{#each alerts as alert}
			<li class="card">
				<!--alert cards-->
				<article class="flex-col">
					<div class="flex-row justify-between align-center">
						<h3>{alert.title}</h3>
						<span class="status">{alert.status}</span>
					</div>
					<p class="street">{alert.street}</p>
					<p class="description">{alert.description}</p>
				</article>
			</li>
		{/each}
	</ul>

	<!--right arrow-->
	<button
		type="button"
		class="arrow"
		aria-label="Próximos alertas"
		disabled={atEnd}
		onclick={() => scrollPage(1)}
	>
		<ChevronRight />
	</button>
</section>

<style>
	.pagination {
		--gap: 1rem;
		--per-page: 3;
		gap: 0.5rem;
	}

	.track {
		display: flex;
		flex: 1;
		gap: var(--gap);
		margin: 0;
		padding: 0.25rem;
		list-style: none;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding: 0.25rem;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.card {
		flex: 0 0 calc((100% - var(--gap) * (var(--per-page) - 1)) / var(--per-page));
		scroll-snap-align: start;
	}

	article {
		height: 100%;
		gap: 0.5rem;
		padding: 1rem;
		border: 1px solid #333;
		border-radius: 1rem;
	}

	h3 {
		font-size: 1rem;
	}

	.status {
		flex-shrink: 0;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.street {
		font-size: 0.85rem;
		color: #666;
	}

	/* Mostra só o começo da descrição */
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid #333;
		border-radius: 50%;
		background: white;
		color: inherit;
		cursor: pointer;
	}

	.arrow:disabled {
		opacity: 0.3;
		cursor: default;
	}

	@media (max-width: 700px) {
		.pagination {
			--per-page: 1;
		}
	}
</style>
