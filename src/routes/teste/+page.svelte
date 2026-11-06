<script lang="ts">
	import { Map, Layer, View } from 'svelte-openlayers'
	import 'svelte-openlayers/styles.css'
</script>

<main>
	<h1>Home</h1>
	<div class="map">
		<View center={[-74.0, 40.7]} zoom={10}>
			<Map>
				<Layer.Tile source="osm" />
			</Map>
		</View>
	</div>
</main>

<style>
	.map {
		width: 100%;
		height: 70vh;
		min-height: 400px;
	}
</style>
