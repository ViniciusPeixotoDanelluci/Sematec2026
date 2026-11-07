<script lang="ts">
	import { TipoDeObstaculos } from "#lib/types/obstaculos.ts"



    const categorias = Object.values(TipoDeObstaculos);

    let titulo = $state('');
    let categoria = $state<TipoDeObstaculos>(TipoDeObstaculos.HOLE);
    let descricao = $state('');
    let bairro = $state('');
    let rua = $state('');
    let imagem = $state<File | null>(null);
    let enviando = $state(false);
    let erro = $state('');

    function lidarComArquivo(evento: Event) {
        const input = evento.target as HTMLInputElement;
        imagem = input.files?.[0] ?? null;
    }

    async function enviar(evento: SubmitEvent) {
        evento.preventDefault();
        erro = '';

        if (!imagem) {
            erro = 'Selecione uma imagem da ocorrência.';
            return;
        }

        const formData = new FormData();
        formData.append('title', titulo);
        formData.append('description', descricao);
        formData.append('category', categoria);
        formData.append('neighborhood', bairro);
        formData.append('street', rua);
        formData.append('photo', imagem);

        enviando = true;
        try {
            const resposta = await fetch('/api/alertas', {
                method: 'POST',
                body: formData
            });
            if (!resposta.ok) throw new Error(await resposta.text());

            titulo = descricao = bairro = rua = '';
            imagem = null;
            categoria = TipoDeObstaculos.HOLE;
        } catch (e) {
            erro = 'Não foi possível cadastrar a ocorrência.';
        } finally {
            enviando = false;
        }
    }
</script>

<form onsubmit={enviar}>
    <h1>Cadastro de ocorrências</h1>

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
            bind:value={descricao}
        ></textarea>
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
        <input type="file" id="ocorrenciaImgInput" accept="image/*" required onchange={lidarComArquivo} />
    </div>

    {#if erro}<p role="alert">{erro}</p>{/if}

    <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Cadastrar'}
    </button>
</form>

<style>
	form {
		height: 100dvh;
		max-width: 560px;
		margin: 0 auto;
		padding: 16px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		align-content: center;
		gap: 10px 12px;
	}

	h1 {
		grid-column: 1 / -1;
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.2;
	}

	form > div {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}

	form > div:has(textarea),
	form > div:has(input[type='file']),
	p[role='alert'],
	button[type='submit'] {
		grid-column: 1 / -1;
	}

	label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--texto-suave);
	}

	textarea {
		height: 72px;
		resize: none;
	}

	input[type='file'] {
		padding: 6px 8px;
		font-size: 0.8rem;
		background: var(--azul-claro);
		border: 1px dashed var(--azul);
		border-radius: 8px;
		cursor: pointer;
	}
	input[type='file']::file-selector-button {
		margin-right: 10px;
		padding: 4px 10px;
		background: var(--azul);
		color: #fff;
		border: 0;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
	}

	p[role='alert'] {
		margin: 0;
		padding: 8px 10px;
		font-size: 0.85rem;
		color: var(--erro);
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
	}

	@media (max-width: 520px) {
		form {
			grid-template-columns: 1fr;
			gap: 8px;
			padding: 12px;
		}
		textarea {
			height: 60px;
		}
	}
</style>