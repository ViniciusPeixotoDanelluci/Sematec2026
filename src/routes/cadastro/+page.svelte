<script lang="ts">
    let tipoObstaculo = $state('obstaculo1');
    let descricao = $state('');
    let endereco = $state('');
    let imagem = $state<File | null>(null);

    function lidarComArquivo(evento:Event){
        const input = evento.target as HTMLInputElement;
        imagem = input.files?.[0] ?? null;
    }

    async function enviar(evento:SubmitEvent) {
        evento.preventDefault();
        const formData = new FormData();
        formData.append('tipo', tipoObstaculo);
        formData.append('descricao', descricao);
        formData.append('endereco', endereco);
        if (imagem) formData.append('imagem', imagem);
    }

</script>

<form onsubmit={enviar}>
    <h1>Cadastro de ocorrências</h1>
    <div>
        <label for="tipoDeObstaculoBtn">Tipo de obstáculo</label>
        <select id="tipoDeObstaculoBtn" bind:value={tipoObstaculo}>
            <option value="obstaculo1">Buraco</option>
            <option value="obstaculo3">Poste com defeito</option>
            <option value="obstaculo4">Pixação</option>
            <option value="obstaculo5">Lixo amontuado</option>
            <option value="obstaculo6">Calçada destruída</option>

        </select>
    </div>
    
    <div>
        <label for="descTextInput"> Descrição da ocorrência</label>
        <textarea id="descTextInput" placeholder="Escreva sobre o problema encontrado:" bind:value={descricao}></textarea>
    </div>
    
    <div>
        <label for="enderecoTxtInput">Digite o endereço da ocorrência</label>
        <input type="text" id="enderecoTxtInput" bind:value={endereco}/>
    </div>
    
    <div>
        <label for="ocorrenciaImgInput">Imagem da ocorrência</label>
        <input type="file" id="ocorrenciaImgInput" accept="image/*" onchange={lidarComArquivo}/>
    </div>
    
    <button type="submit">Cadastrar</button>
</form>

<style>
</style>