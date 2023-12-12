const form = document.querySelector('#formulario');

let receita = sessionStorage.getItem('receita')
receita = JSON.parse(receita)

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    atualizarReceita();
})

async function preencherInputEditarReceita(){
    receita.idreceita = receita.idreceita;
    document.querySelector('#descricao').value = receita.descricao;
    document.querySelector('#dataReceita').value = receita.datareceita;
    document.querySelector('#valor').value = receita.valor;
}
preencherInputEditarReceita();

async function atualizarReceita(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idreceita: receita.idreceita,
            idusuario: receita.idusuario,
            descricao: document.querySelector('#descricao').value,
            datareceita: document.querySelector('#dataReceita').value,
            valor: document.querySelector('#valor').value 
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/atualizar', options);
    if(resultado.ok == true){
        alert("Atualização realizada com sucesso.");
        window.location.href = "../Receitas/receitas.html"
    } else {
        alert("Houve um problema na atualização da pessoa.");
    }
    form.reset();
}

