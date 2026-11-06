<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Path } from '$app/types'
</script>

<section class="hero flex-row justify-center align-center">
	<div class="hero-content">
		<h1>Texto de exemplo GRANDE <br />fdss</h1>
		<p style="margin: 15px 0;">Pode parecer besteira mas é assim pequenininho</p>

		<div class="alert-link flex-row justify-center">
			<a href={resolve('/alertas' as Path)} class="btn">Alertas</a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 10rem;
		text-align: center;
	}

	.hero-content {
		max-width: 800px;
		width: 100%;
		background: rgba(0, 0, 0, 1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 40px;
		color: white;
	}

	.alert-link {
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border-radius: 1.5rem;
		text-decoration: none;
		background: white;
		color: black;
	}
</style>
