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
        let td_dataReceita = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_idReceita.innerText = dados[i].idreceita;
        td_descricao.innerText = dados[i].descricao;
        td_valor.innerText = dados[i].valor;
        td_dataReceita.innerText = formatarData(dados[i].datareceita);
        acumulador += dados[i].valor;

        let editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.style.height = '30px';
        editar.style.width = '100px';
        editar.style.margin = '5px';
        editar.style.padding = '2px';
        editar.setAttribute('onclick', 'editarReceita(' + JSON.stringify(dados[i]) + ')');
        td_acoes.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.style.height = '30px';
        excluir.style.width = '100px';
        excluir.style.margin = '5px';
        excluir.style.padding = '2px';
        excluir.setAttribute('onclick', 'excluirReceita(' + JSON.stringify(dados[i]) + ')');
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

function editarReceita(dados){
    sessionStorage.setItem('receita', JSON.stringify(dados));
    window.location.href = '../EditarReceitas/editarReceitas.html'
}

async function buscarReceita(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "GET",
        headers: {"Content-type": "application/json"}
    };
    const listaReceitas = await fetch('http://localhost:8080/senhor-financas/rest/receita/listar/' + usuario.idusuario, options);
    const listaReceitasJson = await listaReceitas.json();
    if(listaReceitasJson.length != 0){
        preencherTabela(listaReceitasJson);
    } else {
        alert("Nenhuma receita encontrada.");
    }
}

async function excluirReceita(dados){
    let idreceita = dados.idreceita;
    let options = {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idreceita: dados.idreceita
        })
    }
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/excluir/' + idreceita, options);
    if(resultado.ok == true){
        alert("Exclusão realizada com sucesso.");
        buscarReceita();
    } else {
        alert("Houve um problema na exclusão da receita.");
        buscarReceita();
    }
}

async function limparReceita(){
    window.location.href = "../Receitas/receitas.html";
}

