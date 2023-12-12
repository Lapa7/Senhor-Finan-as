const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarUsuario();
})

async function cadastrarUsuario(){
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idusuario: 0,
            nome: document.querySelector('#nome').value,
            cpf: document.querySelector('#cpf').value,
            email: document.querySelector('#email').value,
            datanascimento: document.querySelector('#dataNascimento').value,
            login: document.querySelector('#login').value,
            senha: document.querySelector('#senha').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/usuario/cadastrar', options);
    usuario = await resultado.json();
    if(usuario.idusuario != 0){
        alert("Cadastro realizado com sucesso.");
    } else {
        alert("Houve um problema no cadastro da pessoa.");
    }
    form.reset();
}