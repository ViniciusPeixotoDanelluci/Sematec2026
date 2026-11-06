<script lang="ts">
	import Hero from './Hero.svelte'
	import AlertPagination from './AlertPagination.svelte'

	const { data } = $props()!

	$inspect("uai",data)

</script>

<div>
	<Hero />

	<AlertPagination alerts={data.alerts}/>
</div>
