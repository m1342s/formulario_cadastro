const form = document.getElementById("formCadastro")
const campos = ["cep","rua","bairro","cidade","estado"]

window.addEventListener("load",()=>{
    const dados = JSON.parse(localStorage.getItem("cadastroUsuario"))
    if(dados){
        campos.forEach(campo =>{
            document.getElementById(campo).value || ""

        })
    }
})

form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    const dados = {}
    campos.forEach(campo=>{
       dados[campo]=document.getElementById(campo).value
    })
    localStorage.getItem("cadastroUsuario",JSON.stringify(dados))
    alert("Dados salvos com sucesso!")
})

document.getElementById("cep").addEventListener("blur",()=>{
    let cep = document.getElementById("cep").value.replace(/\D/g,"")
    if(cep.length === 8){
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta =>resposta.json())
        .then(dados =>{
            console.log(dados)
            if(dados.erro){
                alert("CEP não encontrado ou inválido!")
                return;
            }
            document.getElementById("rua").value=dados.logradouro
            document.getElementById("bairro").value=dados.bairro
            document.getElementById("cidade").value=dados.localidade
            document.getElementById("estado").value=dados.uf
        })
        .catch(()=>alert("Erro ao buscar o CEP!"))
    }
});