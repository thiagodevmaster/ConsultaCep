async function connectionApi(cep){
    var mensagemDeErro = document.getElementById('erro');
    mensagemDeErro.innerHTML = '';

    try{
        const connection = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const convertedConnection = await connection.json();
        if(convertedConnection.erro){
            throw Error("Cep não existente");
        }

        var cidade      = document.getElementById('cidade');
        var logradouro  = document.getElementById('endereco');
        var estado      = document.getElementById('estado');
        var bairro      = document.getElementById('bairro');
        var complemento = document.getElementById('complemento');

        cidade.value      = convertedConnection.localidade;
        cidade.setAttribute("disabled", "");
        logradouro.value  = convertedConnection.logradouro;
        logradouro.setAttribute("disabled", "");
        estado.value      = convertedConnection.uf;
        estado.setAttribute("disabled", "");
        bairro.value      = convertedConnection.bairro;
        bairro.setAttribute("disabled", "");
        complemento.value = convertedConnection.complemento;
        complemento.setAttribute("disabled", "");

        return convertedConnection;
    }catch(error){
        mensagemDeErro.innerHTML = "CEP inserido é inválido";
    }
    
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => connectionApi(cep.value));

