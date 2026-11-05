<script lang="ts">
	type Alert = {
		title: string
		description: string
		category: string
		neighborhood: string
		street: string
	}

	const alerts: Alert[] = [
		{
			title: 'Buraco na pista',
			description: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.',
			category: 'Buraco',
			neighborhood: 'Centro',
			street: "Rua São João de Miriti"
		},
		{
			title: 'Poste com lâmpada apagada',
			description: 'A rua está sem iluminação durante a noite.',
			category: 'Iluminação',
			neighborhood: 'Itapecirica da Serra',
			street: "Rua 3"
		},
		{
			title: 'Descarte irregular de lixo',
			description: 'Há sacos de lixo acumulados na calçada.',
			category: 'Lixo',
			neighborhood: 'Av. Getúlio Vargas',
			street: "Rua 4"
		},
		{
			title: 'Calçada danificada',
			description: 'Trecho quebrado pode dificultar a passagem de pedestres.',
			category: 'Calçada',
			neighborhood: 'Flores Cavalcante',
			street: "Rua 5"
		}
	]

	const categories = ['Todas as categorias', ...new Set(alerts.map((alert) => alert.category))]

	let search = $state('')
	let selectedCategory = $state(categories[0])

</script>

	<!-- O nome dessa rota esta aberto a debate -->
<svelte:head>
	<title>Alertas da comunidade</title>
	<meta name="description" content="Acompanhe e filtre problemas reportados pela comunidade." />
</svelte:head>

<main>
	<header>
		<h1>Alertas da comunidade</h1>
		<p>Problemas reportados na região</p>
	</header>

	<section class="filters">
		<label for="search">Buscar alertas</label>
		<input
			id="search"
			type="search"
			placeholder="Busque por problema ou bairro"
			bind:value={search}
		/>

		<label for="category">Categoria</label>
		<select id="category" bind:value={selectedCategory}>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>

		<label for="neighborhood">Bairro</label>
		<input id="neighborhood" type="text">
	</section>

	<section class="feed">
		<ul>
			{#each alerts as alert}
				<li>
					<article>
						<div class="alert-heading">
							<h3>{alert.title}</h3>
							<span class="category">{alert.category}</span>
						</div>
						<p>{alert.description}</p>
						<!-- <p class="details">{alert.neighborhood} · {alert.reportedAt}</p> -->
					</article>
				</li>
			{/each}
		</ul>

	</section>
</main>

<style>
	main {
		max-width: 760px;
		margin: 0 auto;
		padding: 2rem 1rem;
		color: #222;
		font-family: Arial, sans-serif;
	}

	header {
		margin-bottom: 1.5rem;
	}

	h1,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		margin-bottom: 0.35rem;
		font-size: 1.7rem;
	}

	header p {
		color: #666;
	}

	.filters {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem 1rem;
		margin-bottom: 2rem;
	}

	label {
		font-size: 0.9rem;
		font-weight: 600;
	}

	input,
	select {
		min-height: 2.5rem;
		padding: 0.45rem 0.6rem;
		border: 1px solid #bbb;
		border-radius: 4px;
		background: white;
		color: inherit;
		font: inherit;
	}

	select {
		width: 100%;
	}

	ul {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	article {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.alert-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	h3 {
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}

	.category {
		font-size: 0.85rem;
	}

	article p {
		margin-bottom: 0.5rem;
	}
</style>
