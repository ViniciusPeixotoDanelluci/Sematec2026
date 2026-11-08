<script lang="ts">
	import { ObstacleType } from '#lib/types/obstacle-type.ts'

	const categorias = [
		ObstacleType.HOLE,
		ObstacleType.GARBAGE,
		ObstacleType.LIGHTINING,
		ObstacleType.SIDEWALK
	] as ObstacleType[]

	let titulo = $state('')
	let categoria = $state<ObstacleType>(ObstacleType.HOLE)
	let descricao = $state('')
	let bairro = $state('')
	let rua = $state('')
	let imagem = $state<File | null>(null)
	let erro = $state('')
	let sucesso = $state('')

	function lidarComArquivo(evento: Event) {
		const input = evento.target as HTMLInputElement
		imagem = input.files?.[0] ?? null
	}

	function enviar(evento: SubmitEvent) {
		evento.preventDefault()
		erro = ''
		sucesso = ''

		if (!imagem) {
			erro = 'Selecione uma imagem da ocorrência.'
			return
		}

		titulo = descricao = bairro = rua = ''
		imagem = null
		categoria = ObstacleType.HOLE
		sucesso = 'Relato recebido para demonstração. Nenhum dado foi salvo.'
	}
</script>

<form onsubmit={enviar}>
	<h1>Cadastro de ocorrências</h1>
	<p class="notice">
		Este formulário é demonstrativo: os relatos não são salvos nem aparecem no mapa.
	</p>

	<div>
		<label for="tituloInput">Título</label>
		<input type="text" id="tituloInput" required bind:value={titulo} />
	</div>

	<div>
		<label for="categoriaSelect">Tipo de obstáculo</label>
		<select id="categoriaSelect" required bind:value={categoria}>
			{#each categorias as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="descTextInput">Descrição da ocorrência</label>
		<textarea
			id="descTextInput"
			required
			placeholder="Escreva sobre o problema encontrado:"
			bind:value={descricao}></textarea>
	</div>

	<div>
		<label for="bairroInput">Bairro</label>
		<input type="text" id="bairroInput" required bind:value={bairro} />
	</div>

	<div>
		<label for="ruaInput">Rua</label>
		<input type="text" id="ruaInput" required bind:value={rua} />
	</div>

	<div>
		<label for="ocorrenciaImgInput">Imagem da ocorrência</label>
		<input
			type="file"
			id="ocorrenciaImgInput"
			accept="image/*"
			required
			onchange={lidarComArquivo}
		/>
	</div>

	{#if erro}<p role="alert">{erro}</p>{/if}
	{#if sucesso}<p class="success" role="status">{sucesso}</p>{/if}

	<button type="submit">Enviar relato</button>
</form>

<style>
	form {
		width: 100%;
		max-width: 840px;
		margin: 0 auto;
		padding: clamp(24px, 5vw, 48px);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		align-content: center;
		gap: 20px 24px;
	}

	h1 {
		grid-column: 1 / -1;
		margin: 0;
		font-size: 2rem;
		line-height: 1.2;
	}

	form > div {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	input:not([type='file']),
	select,
	textarea {
		padding: 12px;
		font-size: 1rem;
	}

	form > .notice,
	form > div:has(textarea),
	form > div:has(input[type='file']),
	p[role='alert'],
	p[role='status'],
	button[type='submit'] {
		grid-column: 1 / -1;
	}

	.notice,
	.success {
		margin: 0;
		color: var(--texto-suave);
	}

	.success {
		color: #166534;
	}

	label {
		font-size: 1rem;
		font-weight: 600;
		color: var(--texto-suave);
	}

	textarea {
		height: 160px;
		resize: none;
	}

	input[type='file'] {
		padding: 12px;
		font-size: 1rem;
		background: var(--azul-claro);
		border: 1px dashed var(--azul);
		border-radius: 8px;
		cursor: pointer;
	}
	input[type='file']::file-selector-button {
		margin-right: 12px;
		padding: 8px 12px;
		background: var(--azul);
		color: #fff;
		border: 0;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
	}

	button[type='submit'] {
		padding: 14px 18px;
		font-size: 1rem;
	}

	p[role='alert'] {
		margin: 0;
		padding: 12px 14px;
		font-size: 1rem;
		color: var(--erro);
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
	}

	@media (max-width: 520px) {
		form {
			grid-template-columns: 1fr;
			gap: 16px;
			padding: 24px 16px;
		}
		h1 {
			font-size: 1.75rem;
		}
		textarea {
			height: 140px;
		}
	}
</style>
