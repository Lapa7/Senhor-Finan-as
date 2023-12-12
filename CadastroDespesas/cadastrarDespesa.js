const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarDespesa();
})

async function cadastrarDespesa(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            iddespesa: 0,
            idusuario: usuario.idusuario,
            descricao: document.querySelector('#descricao').value,
            datavencimento: document.querySelector('#dataVencimento').value,
            datapagamento: document.querySelector('#dataPagamento').value,
            valor: document.querySelector('#valor').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/cadastrar', options);
    despesa = await resultado.json();
    if(despesa.idreceita != 0){
        alert("Cadastro realizado com sucesso.");
    } else {
        alert("Houve um problema no cadastro da despesa.");
    }
    form.reset();
}