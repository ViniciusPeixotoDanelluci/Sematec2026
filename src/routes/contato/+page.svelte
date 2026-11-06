<script lang="ts">
	type Orgao = {
		nome: string
		email?: string
		site?: string
		tel?: string
		tel2?: string
		whatsapp?: string
		endereco?: string
		obs?: string
	}

	const orgaos: Record<string, Orgao> = {
		'aracatuba-sp': {
			nome: 'Prefeitura de Araçatuba',
			email: 'ouvidoria.geral@aracatuba.sp.gov.br',
			site: 'https://aracatuba.sp.gov.br/',
			tel: '(18) 3607-6500',
			whatsapp: '(18) 99825-4155',
			endereco: 'Rua Conselheiro Oscar Rodrigues Alves, 295 - Centro',
			obs: 'Atende Fácil (WhatsApp). Pedidos de tapa-buracos e iluminação também pelo site oficial.'
		},
		'santo-antonio-do-aracangua-sp': {
			nome: 'Prefeitura de Santo Antônio do Aracanguá',
			email: 'obras@saaracangua.sp.gov.br',
			tel: '(18) 3639-9000',
			tel2: '(18) 3639-9008',
			endereco: 'Rua Dr. Pio Prado, 285, Centro - CEP 16130-000',
			obs: 'Obras e Serviços: (18) 3639-9008, obras@saaracangua.sp.gov.br. Vias Públicas (Estradas): estradas@saaracangua.sp.gov.br. Subprefeitura de Vicentinópolis: (18) 3604-1220. Subprefeitura de Major Prado: (18) 3639-8329.'
		},
		'birigui-sp': {
			nome: 'Prefeitura de Birigui',
			tel: '(18) 3643-6000',
			endereco: 'Rua Anhanguera, 1155 - Jardim Morumbi',
			obs: 'Secretaria de Obras: responsável pela manutenção das ruas e asfalto.'
		},
		'sao-jose-do-rio-preto-sp': {
			nome: 'Prefeitura de São José do Rio Preto',
			tel: '(17) 3203-1100',
			tel2: '156',
			endereco:
				'Prefeitura Regional Norte: Shopping Cidade Norte (Av. Alfredo Antônio de Oliveira, 2077)',
			obs: 'Disque 156: tapa-buracos, troca de lâmpadas e limpeza pública. Também há o Portal de Serviços da Prefeitura.'
		},
		'votuporanga-sp': {
			nome: 'Prefeitura de Votuporanga',
			tel: '(17) 3405-9700',
			tel2: '0800 770 3590',
			obs: 'Tel 2 é a Ouvidoria Geral (ligação gratuita). Protocolos de tapa-buracos pelo app Conecta Votuporanga ou pelo portal de serviços.'
		},
		'nova-luzitania-sp': {
			nome: 'Prefeitura de Nova Luzitânia',
			tel: '(17) 3483-9200',
			endereco: 'Rua Pedro Pereira Dias, 1773'
		},
		'gastao-vidigal-sp': {
			nome: 'Prefeitura de Gastão Vidigal',
			tel: '(17) 3848-1155',
			endereco: 'Rua Quinze de Novembro, 525'
		},
		'magda-sp': {
			nome: 'Prefeitura de Magda',
			tel: '(17) 3487-9020',
			endereco: 'Rua Sete de Setembro, 981'
		},
		'general-salgado-sp': {
			nome: 'Prefeitura de General Salgado',
			tel: '(17) 3461-3380',
			tel2: '(17) 3832-2029',
			endereco: 'Av. Antonio José de Carvalho, 940 - Centro'
		},
		'nhandeara-sp': {
			nome: 'Prefeitura de Nhandeara',
			tel: '(17) 3467-4990',
			endereco: 'Rua Dr. Otaviano Cardoso Filho, 359'
		},
		'sebastianopolis-do-sul-sp': {
			nome: 'Prefeitura de Sebastianópolis do Sul',
			tel: '(17) 3837-1210',
			endereco: 'Rua Frederico Raia, 389'
		},
		'floreal-sp': {
			nome: 'Prefeitura de Floreal',
			tel: '(17) 3847-1316',
			endereco: 'Rua Procópio Davidof, 130 - Centro'
		},
		'jales-sp': {
			nome: 'Prefeitura de Jales',
			email: 'ouvidoria@jales.sp.gov.br',
			tel: '(17) 3622-3000',
			tel2: '(17) 3622-3011',
			endereco: 'Rua Cinco, 2266 - Centro',
			obs: 'Tel 2 é a Ouvidoria Geral. Secretaria de Obras, Infraestrutura e Desenvolvimento Urbano: executa reparos de pavimentação.'
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
