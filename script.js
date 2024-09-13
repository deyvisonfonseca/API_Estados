document.addEventListener('DOMContentLoaded', () => {
    const estadosSelect = document.getElementById('estados');
    const cidadesSelect = document.getElementById('cidades');

    async function carregarEstados() {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();
        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.id;
            option.textContent = estado.nome;
            estadosSelect.appendChild(option);
        });
    }

    async function carregarCidades(estadoId) {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        const cidades = await response.json();
        cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>'; 
        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade.id;
            option.textContent = cidade.nome;
            cidadesSelect.appendChild(option);
        });
    }

 
    estadosSelect.addEventListener('change', () => {
        const estadoId = estadosSelect.value;
        if (estadoId) {
            carregarCidades(estadoId);
        } else {
            cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        }
    });

    carregarEstados();
});