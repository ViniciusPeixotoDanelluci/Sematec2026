<script lang="ts">
	import Hero from './Hero.svelte'
	import AlertPagination from './AlertPagination.svelte'

	const { data } = $props()!

	$inspect('uai', data)
</script>

<div class="home-page flex-col">
	<Hero />

	<AlertPagination alerts={data.alerts} />
</div>

<style>
	.home-page {
		flex: 1;
		min-width: 0;
		min-height: 0;
	}
</style>
