<script lang="ts">
	type Orgao = {
		nome: string
		email?: string
		site?: string
		tel?: string
		tel2?: string
		tel2Rotulo?: string
		whatsapp?: string
		endereco?: string
		obs?: string
	}

	type Localizacao = {
		cidade: string
		estado: string
		bairro?: string
		rua?: string
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
			tel2Rotulo: 'Obras e Serviços',
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
			tel2Rotulo: 'Disque 156',
			endereco:
				'Prefeitura Regional Norte: Shopping Cidade Norte (Av. Alfredo Antônio de Oliveira, 2077)',
			obs: 'Disque 156: tapa-buracos, troca de lâmpadas e limpeza pública. Também há o Portal de Serviços da Prefeitura.'
		},
		'votuporanga-sp': {
			nome: 'Prefeitura de Votuporanga',
			tel: '(17) 3405-9700',
			tel2: '0800 770 3590',
			tel2Rotulo: 'Ouvidoria Geral (gratuito)',
			obs: 'Protocolos de tapa-buracos pelo app Conecta Votuporanga ou pelo portal de serviços.'
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
			tel2Rotulo: 'Ouvidoria Geral',
			endereco: 'Rua Cinco, 2266 - Centro',
			obs: 'Secretaria de Obras, Infraestrutura e Desenvolvimento Urbano: executa reparos de pavimentação.'
		}
	}

	const cidadesAtendidas = Object.values(orgaos).map((o) => o.nome.replace('Prefeitura de ', ''))

	let cep = $state('')
	let orgao = $state<Orgao | null>(null)
	let local = $state<Localizacao | null>(null)
	let erro = $state('')
	let carregando = $state(false)

	const cepLimpo = $derived(cep.replace(/\D/g, ''))
	const cepCompleto = $derived(cepLimpo.length === 8)

	function normalizar(texto: string) {
		return texto
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
	}

	function mascararCep(evento: Event) {
		const digitos = (evento.currentTarget as HTMLInputElement).value.replace(/\D/g, '').slice(0, 8)
		cep = digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos
	}

	const soDigitos = (texto: string) => texto.replace(/\D/g, '')

	const linkWhatsapp = (numero: string) => `https://wa.me/55${soDigitos(numero)}`

	const linkMapa = (endereco: string, loc: Localizacao | null) =>
		`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			[endereco, loc?.cidade, loc?.estado].filter(Boolean).join(', ')
		)}`

	async function enviarEndereco(evento: SubmitEvent) {
		evento.preventDefault()
		erro = ''
		orgao = null
		local = null

		if (!cepCompleto) {
			erro = 'Digite os 8 números do CEP.'
			return
		}

		carregando = true

		try {
			const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`)
			if (!resposta.ok) throw new Error('CEP não encontrado. Confira os números e tente de novo.')

			const { city, state, neighborhood, street } = await resposta.json()
			local = { cidade: city, estado: state, bairro: neighborhood, rua: street }

			const encontrado = orgaos[`${normalizar(city)}-${state.toLowerCase()}`]
			if (!encontrado) {
				throw new Error(
					`Ainda não temos contato cadastrado para ${city}/${state}. Veja abaixo as cidades atendidas.`
				)
			}

			orgao = encontrado
		} catch (e) {
			erro = e instanceof Error ? e.message : 'Algo deu errado. Tente novamente em instantes.'
		} finally {
			carregando = false
		}
	}
</script>

<main>
	<header>
		<h1>Fale com a prefeitura da sua cidade</h1>
		<p>
			Informe o CEP do local do problema (buraco na rua, lâmpada queimada, entulho...) e veja
			como contatar o órgão responsável.
		</p>
	</header>

	<form onsubmit={enviarEndereco} novalidate>
		<label for="cepInput">CEP</label>
		<div>
			<input
				type="text"
				id="cepInput"
				inputmode="numeric"
				autocomplete="postal-code"
				maxlength="9"
				placeholder="00000-000"
				value={cep}
				oninput={mascararCep}
				aria-invalid={erro ? 'true' : undefined}
				aria-describedby={erro ? 'cepErro' : undefined}
			/>
			<button type="submit" disabled={carregando || !cepCompleto}>
				{carregando ? 'Buscando...' : 'Buscar contato'}
			</button>
		</div>
	</form>

	{#if erro}
		<p class="erro" id="cepErro" role="alert">{erro}</p>
	{/if}

	{#if orgao}
		<section aria-live="polite">
			{#if local}
				<p>
					{[local.rua, local.bairro].filter(Boolean).join(', ')}
					{local.rua || local.bairro ? ' — ' : ''}{local.cidade}/{local.estado}
				</p>
			{/if}

			<h2>{orgao.nome}</h2>

			<dl>
				{#if orgao.tel}
					<div>
						<dt>Telefone</dt>
						<dd><a href={`tel:${soDigitos(orgao.tel)}`}>{orgao.tel}</a></dd>
					</div>
				{/if}

				{#if orgao.tel2}
					<div>
						<dt>{orgao.tel2Rotulo ?? 'Outro telefone'}</dt>
						<dd><a href={`tel:${soDigitos(orgao.tel2)}`}>{orgao.tel2}</a></dd>
					</div>
				{/if}

				{#if orgao.whatsapp}
					<div>
						<dt>WhatsApp</dt>
						<dd>
							<a href={linkWhatsapp(orgao.whatsapp)} target="_blank" rel="noopener noreferrer">
								{orgao.whatsapp}
							</a>
						</dd>
					</div>
				{/if}

				{#if orgao.email}
					<div>
						<dt>E-mail</dt>
						<dd><a href={`mailto:${orgao.email}`}>{orgao.email}</a></dd>
					</div>
				{/if}

				{#if orgao.site}
					<div>
						<dt>Site</dt>
						<dd>
							<a href={orgao.site} target="_blank" rel="noopener noreferrer">
								{orgao.site.replace(/^https?:\/\//, '').replace(/\/$/, '')}
							</a>
						</dd>
					</div>
				{/if}

				{#if orgao.endereco}
					<div>
						<dt>Endereço</dt>
						<dd>
							{orgao.endereco}
							<a
								href={linkMapa(orgao.endereco, local)}
								target="_blank"
								rel="noopener noreferrer"
							>
								Ver no mapa
							</a>
						</dd>
					</div>
				{/if}
			</dl>

			{#if orgao.obs}
				<p>{orgao.obs}</p>
			{/if}

			<p>
				Ao ligar ou escrever, informe o endereço exato, um ponto de referência e, se puder, envie
				uma foto. Peça o número de protocolo para acompanhar o pedido.
			</p>
		</section>
	{:else if !carregando}
		<section>
			<h2>Cidades atendidas</h2>
			<ul>
				{#each cidadesAtendidas as cidade}
					<li>{cidade}</li>
				{/each}
			</ul>
			<p>Não encontrou a sua? Ela ainda não foi cadastrada.</p>
		</section>
	{/if}
</main>

<style>
	main {
		max-width: 560px;
		margin: 0 auto;
		padding: 24px 16px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1.15rem;
		margin-bottom: 12px;
	}

	/* Formulário: label em cima, input + botão lado a lado */
	form {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	form > div {
		display: flex;
		gap: 8px;
	}

	form input {
		flex: 1;
		min-width: 0;
		padding: 10px 12px;
		border: 1px solid #cbd5e1;
		border-radius: 8px;
	}

	form button {
		padding: 10px 16px;
		border: 0;
		border-radius: 8px;
		cursor: pointer;
	}

	form button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	/* Cartão do resultado */
	section {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
	}

	dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	dl > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	dt {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		opacity: 0.7;
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}

	dd a + a,
	dd a:last-child:not(:only-child) {
		margin-left: 8px;
	}

	ul {
		margin: 0;
		padding-left: 20px;
		columns: 2;
	}

	.erro {
		color: crimson;
	}

	@media (max-width: 520px) {
		main {
			padding: 16px 12px;
		}

		ul {
			columns: 1;
		}
	}
</style>