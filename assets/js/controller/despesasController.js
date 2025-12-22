// Carregando a lista de subcategorias conforme a categoria selecionada
function popularSubcategorias() {
    const categoriaSelect = document.getElementById('despesa-categoria');
    const subcategoriaSelect = document.getElementById('despesa-subcategoria');

    // Pega o valor (value) selecionado na categoria principal
    const categoriaSelecionada = categoriaSelect.value;

    // Limpa e desabilita a subcategoria
    subcategoriaSelect.innerHTML = '<option value="" disabled selected>-- Selecione a Subcategoria --</option>';
    subcategoriaSelect.disabled = true;

    // Verifica se a categorioa é válida e possui subcategrias
    if(categoriaSelecionada && CATEGORIA_DESPESAS[categoriaSelecionada]) {
        const subcategorias = CATEGORIA_DESPESAS[categoriaSelecionada];

        // Preenche o select de subcategorias cm as opções do modelo
        subcategorias.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.toLowerCase().replace(/[^a-z0-9]/g, '-');
            option.textContent = sub;
            subcategoriaSelect.appendChild(option);
        });

        // Habilita o select de subcategorias
        subcategoriaSelect.disabled = false;
    }
}

// Função para cadastrar uma despesa.
//===================================================================================

function cadastrarDespesas(event) {
    // 1. Intercepta o envio padrão (que recarregaria a página)
    event.preventDefault();

    console.log("O botão salvar foi clicado e a função iniciada!");

    // 2. Coleta os dados que o usuário digitou na View (DOM)
    const dadosFormulario = {
        tipo: document.getElementById('despesa-tipo').value,
        categoria: document.getElementById('despesa-categoria').value,
        subcategoria: document.getElementById('despesa-subcategoria').value,
        valor: document.getElementById('despesa-valor').value,
        observacoes: document.getElementById('despesa-observacoes').value
    };

    // 3. Validação simples antes de mandar para o banco
    if (!dadosFormulario.valor || !dadosFormulario.categoria) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    // 4. Aqui você chamará o MODEL para salvar no banco
    //console.log("Dados prontos para o Model:", dadosFormulario);
    DespesaModel.salvar(dadosFormulario);
}