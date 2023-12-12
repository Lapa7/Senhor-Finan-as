const buscar = document.querySelector('#buscar')
const limpar = document.querySelector('#limpar');

function preencherTabela(dados) {
    let tbody = document.getElementById('tbody');
    let acumulador = 0;
    tbody.innerText = '';

    for (let i = 0; i < dados.length; i++) {
        let tr = tbody.insertRow();
        let td_idReceita = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_dataVencimento = tr.insertCell();
        let td_dataPagamento = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_idReceita.innerText = dados[i].iddespesa;
        td_descricao.innerText = dados[i].descricao;
        td_valor.innerText = dados[i].valor;
        td_dataVencimento.innerText = formatarData(dados[i].datavencimento);
        td_dataPagamento.innerText = formatarData(dados[i].datapagamento);
        acumulador += dados[i].valor;

        let editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.style.height = '30px';
        editar.style.width = '100px';
        editar.style.margin = '5px';
        editar.style.padding = '2px';
        editar.setAttribute('onclick', 'editarDespesa(' + JSON.stringify(dados[i]) + ')');
        td_acoes.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.style.height = '30px';
        excluir.style.width = '100px';
        excluir.style.margin = '5px';
        excluir.style.padding = '2px';
        excluir.setAttribute('onclick', 'excluirDespesa(' + JSON.stringify(dados[i]) + ')');
        td_acoes.appendChild(excluir);

    }
    total.innerText = acumulador.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function formatarData(data){
    let dataFormatada = new Date(data),
    dia  = dataFormatada.getDate().toString().padStart(2,'0'),
    mes  = (dataFormatada.getMonth()+1).toString().padStart(2,'0'),
    ano  = dataFormatada.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

function editarDespesa(dados){
    sessionStorage.setItem('despesa', JSON.stringify(dados));
    window.location.href = '../EditarDespesas/editarDespesa.html'
}

async function buscarDespesa(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "GET",
        headers: {"Content-type": "application/json"}
    };
    const listaDespesa = await fetch('http://localhost:8080/senhor-financas/rest/despesa/listar/' + usuario.idusuario, options);
    const listaDespesasJson = await listaDespesa.json();
    if(listaDespesasJson.length != 0){
        preencherTabela(listaDespesasJson);
    } else {
        alert("Nenhuma despesa encontrada.");
    }
}

async function excluirDespesa(dados){
    let iddespesa = dados.iddespesa;
    let options = {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            iddespesa: dados.iddespesa
        })
    }
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/excluir/' + iddespesa, options);
    if(resultado.ok == true){
        alert("Exclusão realizada com sucesso.");
        buscarDespesa();
    } else {
        alert("Houve um problema na exclusão da despesa.");
    }
}


async function limparDespesa(){
    window.location.href = "../Despesas/despesas.html"
}
