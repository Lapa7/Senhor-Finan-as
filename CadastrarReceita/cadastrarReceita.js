const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarReceita();
})

async function cadastrarReceita(){
    let usuario = sessionStorage.getItem('usuario')
    usuario = JSON.parse(usuario)
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idreceita: 0,
            idusuario: usuario.idusuario,
            descricao: document.querySelector('#descricao').value,
            datareceita: document.querySelector('#datareceita').value,
            valor: document.querySelector('#valor').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/cadastrar', options);
    receita = await resultado.json();
    if(receita.idreceita != 0){
        alert("Cadastro realizado com sucesso.");
    } else {
        alert("Houve um problema no cadastro da receita.");
    }
    form.reset();
}