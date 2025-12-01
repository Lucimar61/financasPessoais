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