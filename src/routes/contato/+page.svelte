<script lang="ts">
	type Orgao = { nome: string; email: string; site: string; tel: string }

	const orgaos: Record<string, Orgao> = {
		'aracatuba-sp': {
			nome: 'Prefeitura de Araçatuba',
			email: 'contato@exemplo.gov.br',
			site: 'https://www.exemplo.gov.br',
			tel: '(18) 0000-0000'
		}
	}

	let cep = $state('')
	let orgao = $state<Orgao | null>(null)
	let erro = $state('')
	let carregando = $state(false)

	function normalizar(texto: string) {
		return texto
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
	}

	async function enviarEndereco(evento: SubmitEvent) {
		evento.preventDefault()
		erro = ''
		orgao = null
		carregando = true

		try {
			const cepLimpo = cep.replace(/\D/g, '')
			const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`)
			if (!resposta.ok) throw new Error('CEP não encontrado.')

			const { city, state } = await resposta.json()
			const chave = `${normalizar(city)}-${state.toLowerCase()}`

			const encontrado = orgaos[chave]
			if (!encontrado) throw new Error(`Não temos contato cadastrado para ${city}/${state}.`)

			orgao = encontrado
		} catch (e) {
			erro = e instanceof Error ? e.message : 'Erro inesperado.'
		} finally {
			carregando = false
		}
	}
</script>

<div>
	<form onsubmit={enviarEndereco}>
		<h1>Entre em contato com um órgão público</h1>

		<div>
			<label for="cepInput">CEP</label>
			<input type="text" id="cepInput" bind:value={cep} placeholder="00000-000" />
		</div>

		<button type="submit" disabled={carregando}>
			{carregando ? 'Buscando...' : 'Enviar'}
		</button>
	</form>

	{#if erro}
		<p class="erro">{erro}</p>
	{/if}

	{#if orgao}
		<section>
			<h2>{orgao.nome}</h2>
			<p>E-mail: <a href={`mailto:${orgao.email}`}>{orgao.email}</a></p>
			<p>
				Site: <a href={orgao.site} target="_blank" rel="noopener noreferrer">{orgao.site}</a
				>
			</p>
			<p>Telefone: {orgao.tel}</p>
		</section>
	{/if}
</div>

<style>
	.erro {
		color: crimson;
	}
</style>
