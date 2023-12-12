const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    realizarLogin();
})

async function realizarLogin(){
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            login: document.querySelector('#usuario').value,
            senha: document.querySelector('#senha').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/usuario/login', options);
    const usuarioLogado = await resultado.json();
    if(usuarioLogado.idusuario != 0){
        sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        window.location.href = "../Receitas/receitas.html";
    } else {
        alert("Login ou Senha incorretos.")
        document.querySelector("#senha").value = "";
    }
};