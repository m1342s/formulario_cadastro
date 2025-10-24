document.getElementById("cep").addEventListener("blur",(evento)=>{
    const elemento = evento.target;
    const valor = elemento.value;

    if(!(valor.length === 8)){
        return;
    }

    fetch(`viacep.com.br/ws/${valor}/json`)
    .then(resposta =>resposta.json())
    .then(dados =>{
        console.log(dados)
        if(!dados.erro){
            document.getElementById("bairro").value=dados.bairro;
            document.getElementById("rua").value=dados.rua;
            document.getElementById("cidade").value=dados.cidade;
            document.getElementById("estado").value=dados.uf;
            const dadosUsuario = JSON.parse(localStorage.getItem("cadastro"))
            localStorage.setItem("cadastro",JSON.stringify(dados))
        }else{
            alert("CEP não encontrado ou inválido")
        }
    })
    .catch(error =>console.error(error))
})