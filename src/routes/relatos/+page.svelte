<script lang="ts">
	import { ChevronDown } from '@lucide/svelte'
	import { ObstacleType } from '#lib/types/obstacle-type.ts'
	import { AlertStatus } from '#lib/types/alert-status.type.ts'
	import { Map, Layer, View } from 'svelte-openlayers'
	import { fromLonLat } from 'ol/proj'
	import type OlView from 'ol/View.js'
	import type { Alert } from '#lib/types/alert.type.ts'
	import type { PageProps } from './$types'
	import 'svelte-openlayers/styles.css'

	let { data }: PageProps = $props()
	let alerts: Alert[] = $derived(data.alerts ?? [])

	let categories: (ObstacleType | 'Todas')[] = $derived([
		'Todas',
		...new Set(alerts.flatMap((alert) => alert.category))
	])

	let statuses: (AlertStatus | 'Todas')[] = $derived([
		'Todas',
		...new Set(alerts.map((alert) => alert.status))
	])

	let neighborhoods: string[] = $derived(
		[...new Set(alerts.map((alert) => alert.neighborhood))].sort((a, b) =>
			a.localeCompare(b, 'pt-BR')
		)
	)

	$inspect(alerts)

	let lats_lons: [number, number][] = $derived(
		alerts.map((alert): [number, number] => [alert.longitude, alert.latitude])
	)

	let center = $derived(fromLonLat(lats_lons[0] ?? [0, 0]))
	let mapView: OlView | null = $state(null)

	$inspect('mapa', lats_lons)

	let selectedCategory: ObstacleType | 'Todas' = $state('Todas')
	let selectedStatus: AlertStatus | 'Todas' = $state('Todas')
	let selectedNeighborhood = $state('Todos os bairros')
	let filteredAlerts: Alert[] = $derived(
		alerts.filter(
			(alert) =>
				(selectedCategory === 'Todas' || alert.category === selectedCategory) &&
				(selectedStatus === 'Todas' || alert.status === selectedStatus) &&
				(selectedNeighborhood === 'Todos os bairros' || alert.neighborhood === selectedNeighborhood)
		)
	)

	function formatFeedDate(value: string) {
		const date = new Date(value.replace(' ', 'T'))

		if (Number.isNaN(date.getTime())) return value

		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		})
			.format(date)
			.replace('.', '')
	}

	function formatStatusLabel(status: AlertStatus | string) {
		return status === AlertStatus.STANDBY ? 'Em análise' : status
	}

	function focusAlert(alert: Alert) {
		mapView?.animate({
			center: fromLonLat([alert.longitude, alert.latitude]),
			duration: 500
		})
	}
</script>

<svelte:head>
	<title>Alertas da comunidade</title>
	<meta name="description" content="Acompanhe e filtre problemas reportados pela comunidade." />
</svelte:head>

<div class="container">
	<div class="feed-container flex-col">
		<header>
			<h1>Alertas da comunidade</h1>
			<p>Problemas reportados na região</p>
		</header>

		<section class="filters">
			<div class="filter-field">
				<label for="category">Categoria</label>
				<div class="select-wrapper">
					<select id="category" bind:value={selectedCategory}>
						{#each categories as category}
							<option value={category}
								>{category === 'Todas' ? 'Todas as categorias' : category}</option
							>
						{/each}
					</select>
					<ChevronDown size={16} />
				</div>
			</div>

			<div class="filter-field">
				<label for="status">Situação</label>
				<div class="select-wrapper">
					<select id="status" bind:value={selectedStatus}>
						{#each statuses as status}
							<option value={status}>{status === 'Todas' ? 'Todas as situações' : status}</option>
						{/each}
					</select>
					<ChevronDown size={16} />
				</div>
			</div>

			<div class="filter-field">
				<label for="neighborhood">Bairro</label>
				<div class="select-wrapper">
					<select id="neighborhood" bind:value={selectedNeighborhood}>
						<option value="Todos os bairros">Todos os bairros</option>
						{#each neighborhoods as neighborhood}
							<option value={neighborhood}>{neighborhood}</option>
						{/each}
					</select>
					<ChevronDown size={16} />
				</div>
			</div>
		</section>

		<section class="feed">
			<ul>
				{#each filteredAlerts as alert, index}
					<li>
						<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
						<article
							class="alert-card"
							role="button"
							tabindex="0"
							onclick={() => focusAlert(alert)}
							onkeydown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									event.preventDefault()
									focusAlert(alert)
								}
							}}
						>
							<span class="alert-number">{index + 1}</span>
							<span class="category">{alert.category}</span>
							<span class="status">{formatStatusLabel(alert.status)}</span>
							<h3>{alert.title}</h3>
							<p class="location">
								<span class="location-icon">◉</span>{alert.street}, {alert.neighborhood}
							</p>
							<p class="details">{formatFeedDate(alert.created_at)}</p>
						</article>
					</li>
				{/each}
			</ul>
		</section>
	</div>

	<section class="map-view">
		<View bind:view={mapView} {center} zoom={17}>
			<Map>
				<Layer.Tile source="osm" />
			</Map>
		</View>
	</section>
</div>

<style>
	.container {
		display: grid;
		flex: 1;
		min-width: 0;
		min-height: 0;
		grid-template-columns: minmax(22rem, 0.95fr) minmax(0, 1.8fr);
		gap: 1.25rem;
		margin: 0 auto;
		padding: 1rem 1.25rem;
		background: #f5f8fc;
		color: var(--color-text);
		width: 100%;
	}
	.feed-container > header {
		margin-bottom: 1.5rem;
	}

	.feed-container > header p {
		color: var(--color-muted);
		font-size: 1rem;
	}

	.feed {
		overflow-y: scroll;
	}

	.feed-container,
	.map-view {
		min-height: 0;
		height: 100%;
	}

	.map-view {
		position: relative;
		overflow: hidden;
		border: 1px solid #d5dfec;
		border-radius: 0.85rem;
		background: #eef1ed;
		isolation: isolate;
	}

	:global(.map-view .ol-viewport),
	:global(.map-view .map-canvas) {
		width: 100%;
		height: 100%;
	}

	:global(.map-view .ol-control) {
		display: none;
	}

	:global(.map-view .ol-attribution) {
		display: block;
		right: 0.5rem;
		bottom: 0.45rem;
	}

	.feed-container {
		overflow: hidden;
	}

	h1,
	p {
		margin-top: 0;
	}

	h1 {
		margin-bottom: 0.45rem;
		font-size: 1.75rem;
		font-weight: 700;
		letter-spacing: -0.035em;
	}

	.filters {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		margin-bottom: 0.9rem;
		padding: 0.85rem;
		border: 1px solid #d5dfec;
		border-radius: 0.7rem;
		background: var(--color-surface);
	}

	.filter-field {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
	}

	label {
		color: var(--color-text);
		font-size: 0.875rem;
		font-weight: 600;
	}

	select {
		width: 100%;
		min-height: 2.65rem;
		padding: 0.6rem 1.85rem 0.6rem 2.2rem;
		border: 1px solid #d5dfec;
		border-radius: 0.5rem;
		appearance: none;
		background: var(--color-surface);
		color: inherit;
		font-size: 0.75rem;
		cursor: pointer;
	}

	select:focus-visible {
		border-color: var(--color-primary);
		outline: 2px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		outline-offset: 1px;
	}

	.select-wrapper {
		position: relative;
	}

	.select-wrapper :global(svg) {
		position: absolute;
		top: 50%;
		left: 1rem;
		color: var(--color-muted);
		pointer-events: none;
		transform: translateY(-50%);
	}

	ul {
		display: grid;
		gap: 0.9rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: block;
	}

	.alert-card {
		display: grid;
		grid-template-columns: auto auto 1fr;
		grid-template-areas:
			'number category status'
			'title title title'
			'location location location'
			'details details link';
		align-items: center;
		gap: 0.45rem 0.85rem;
		padding: 0.8rem 1rem 0.8rem 0.85rem;
		border: 1px solid #2a69bb;
		border-radius: 0.8rem;
		background: #f7f9fc;
		box-shadow: none;
		cursor: pointer;
	}

	.alert-card:focus-visible {
		outline: 2px solid #2a69bb;
		outline-offset: 2px;
	}

	.alert-number {
		grid-area: number;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: #2a69bb;
		color: #fff;
		font-size: 0.9rem;
		font-weight: 700;
		line-height: 1;
	}

	.category {
		grid-area: category;
		justify-self: start;
		color: #1d232b;
		font-size: 1rem;
		font-weight: 600;
	}

	.status {
		grid-area: status;
		justify-self: end;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.22rem 0.7rem;
		border-radius: 999px;
		background: #f3d99d;
		color: #7b5a17;
		font-size: 0.74rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.status::before {
		content: '';
		display: inline-block;
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: #b68207;
	}

	h3 {
		grid-area: title;
		margin: 0.2rem 0 0;
		color: #111827;
		font-size: clamp(1.15rem, 1.8vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.location {
		grid-area: location;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		color: #555f6d;
		font-size: 0.96rem;
		line-height: 1.4;
	}

	.location-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		color: #4a4a4a;
		font-size: 0.85rem;
	}

	.details {
		grid-area: details;
		margin: 0;
		color: #5f6773;
		font-size: 0.85rem;
		line-height: 1.4;
	}
</style>
