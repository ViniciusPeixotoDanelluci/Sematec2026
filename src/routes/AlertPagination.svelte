<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Path } from '$app/types'
	import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from '@lucide/svelte'
	import { AlertStatus } from '#lib/types/alert-status.type.ts'
	import type { Alert } from '#lib/types/alert.type.ts'

	type AlertCard = Alert & { photo: string }
	type Props = { alerts: AlertCard[] }

	let { alerts }: Props = $props()

	let track: HTMLUListElement
	let atStart = $state(true)
	let atEnd = $state(false)
	let neighborhood = $derived(alerts[0]?.neighborhood ?? 'Sua região')

	const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	})

	function formatDate(value: string) {
		const date = new Date(value.replace(' ', 'T'))
		return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date).replace('.', '')
	}

	function updateArrows() {
		if (!track) return
		atStart = track.scrollLeft <= 1
		atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
	}

	function scrollPage(direction: -1 | 1) {
		track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
	}

	$effect(() => {
		alerts.length
		updateArrows()
	})
</script>

<section class="pagination flex-col">
	<div class="section-heading">
		<h2>O que acontece no seu bairro</h2>
		<p>Conheça os relatos e acompanhe as mudanças perto de você.</p>
	</div>

	<div class="carousel flex-row align-center">
		<button
			class="arrow"
			disabled={atStart}
			onclick={() => scrollPage(-1)}
		>
			<ChevronLeft size={20} />
		</button>

		<ul class="track" bind:this={track} onscroll={updateArrows}>
			{#each alerts as alert (alert.id)}
				<li class="card">
					<article class="flex-col h-full overflow-h">
						<img class="photo" src={alert.photo} alt={alert.title} />
						<div class="card-content flex-col">
							<div class="card-meta flex-row justify-between align-center">
								<span class="category">{alert.category}</span>
								<span
									class="status flex-row align-center"
									class:status-working={alert.status === AlertStatus.FIXING}
									class:status-solved={alert.status === AlertStatus.SOLVED}
								>
									<span class="status-dot"></span>
									{alert.status}
								</span>
							</div>
							<h3>{alert.title}</h3>
							<p class="street overflow-h">{alert.street} · {alert.neighborhood}</p>
							<div class="card-footer flex-row justify-between align-center">
								<time datetime={alert.created_at}>{formatDate(alert.created_at)}</time>
								<a href={resolve('/alertas' as Path)} class="details-link flex-row align-center">
									Ver relato <ArrowRight size={15} />
								</a>
							</div>
						</div>
					</article>
				</li>
			{/each}
		</ul>

		<button
			class="arrow"
			disabled={atEnd}
			onclick={() => scrollPage(1)}
		>
			<ChevronRight size={20} />
		</button>
	</div>
</section>

<style>
	.pagination {
		flex: 1;
		min-height: 0;
		width: 100%;
		gap: 1rem;
		padding: 2rem clamp(1.25rem, 7vw, 5rem);
		background: var(--color-surface);
		color: var(--color-text);
	}

	.section-heading {
		h2 {
			margin: 0;
			font-size: 1.65rem;
			letter-spacing: -0.025em;
		}
		 p {
			margin-top: 0.3rem;
			color: var(--color-muted);
			font-size: 0.95rem;
		}
	}

	.details-link {
		color: var(--color-primary);
	}

	.carousel {
		flex: 1;
		min-height: 0;
		gap: 0.75rem;
	}

	.track {
		display: flex;
		flex: 1;
		min-width: 0;
		height: 100%;
		gap: 1.5rem;
		margin: 0;
		padding: 0.15rem;
		overflow-x: auto;
		list-style: none;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.card {
		flex: 0 0 calc((100% - 1.5rem) / 2);
		min-width: 17rem;
		scroll-snap-align: start;
	}

	article {
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		background: var(--color-surface);
	}

	.photo {
		width: 100%;
		height: clamp(10rem, 24vh, 13rem);
		object-fit: cover;
	}

	.card-content {
		flex: 1;
		gap: 0.65rem;
		padding: 1rem 1.15rem 0.85rem;
	}

	.card-meta {
		gap: 0.75rem;
	}

	.category {
		color: var(--color-muted);
		font-size: 0.8rem;
		font-weight: 600;
	}

	.status {
		gap: 0.4rem;
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		background: var(--color-status-info-background);
		color: var(--color-status-info-text);
		font-size: 0.75rem;
		white-space: nowrap;
	}

	.status-working {
		background: var(--color-status-working-background);
		color: var(--color-status-working-text);
	}

	.status-solved {
		background: var(--color-status-solved-background);
		color: var(--color-status-solved-text);
	}

	.status-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: currentColor;
	}

	h3 {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 500;
	}

	.street {
		color: var(--color-muted);
		font-size: 0.85rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card-footer {
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.65rem;
		border-top: 1px solid var(--color-border);
		color: var(--color-muted);
		font-size: 0.75rem;
	}

	.details-link {
		gap: 0.25rem;
		font-weight: 600;
		white-space: nowrap;
		
	}

	.arrow {
		display: grid;
		flex-shrink: 0;
		width: 2.25rem;
		height: 2.25rem;
		place-items: center;
		border: 1px solid var(--color-primary);
		border-radius: 50%;
		background: var(--color-hero-background);
		color: var(--color-primary);
		cursor: pointer;
		transition:
			color 160ms ease,
			border-color 160ms ease,
			background-color 160ms ease,
			transform 160ms ease;
	}

	.arrow:hover:not(:disabled) {
		transform: translateY(-1px);
		background: var(--color-primary);
		color: var(--color-surface);
	}

	.arrow:disabled {
		border-color: var(--color-border);
		background: var(--color-surface);
		color: var(--color-muted);
		opacity: 0.35;
		cursor: default;
	}

</style>
