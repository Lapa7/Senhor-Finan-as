const form = document.querySelector('#formulario');

let despesa = sessionStorage.getItem('despesa')
despesa = JSON.parse(despesa)

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    atualizarDespesa();
})

async function preencherInputEditarDespesa(){
    despesa.iddespesa = despesa.iddespesa;
    document.querySelector('#descricao').value = despesa.descricao;
    document.querySelector('#dataVencimento').value = despesa.datavencimento;
    document.querySelector('#dataPagamento').value = despesa.datapagamento;
    document.querySelector('#valor').value = despesa.valor;
}
preencherInputEditarDespesa();

async function atualizarDespesa(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            iddespesa: despesa.iddespesa,
            idusuario: despesa.idusuario,
            descricao: document.querySelector('#descricao').value,
            datavencimento: document.querySelector('#dataVencimento').value,
            datapagamento: document.querySelector('#dataPagamento').value,
            valor: document.querySelector('#valor').value 
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/atualizar', options);
    if(resultado.ok == true){
        alert("Atualização realizada com sucesso.");
        window.location.href = "../Receitas/receitas.html"
    } else {
        alert("Houve um problema na atualização da pessoa.");
    }
    form.reset();
}

