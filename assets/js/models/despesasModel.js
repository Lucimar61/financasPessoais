class DespesaModel {
    async salvar(despesa) {
        const response = await fetch('http://localhost:3000/despesas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(despesa)
        });

        if (!response.ok) throw new Error('Falha ao salvar no banco');
        return await response.json();
    }
}