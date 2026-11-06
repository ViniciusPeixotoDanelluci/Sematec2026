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