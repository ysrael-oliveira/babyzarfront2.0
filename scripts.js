
// Função para consultar lista existente por meio de requisição GET
const consultarItens = async() => {
    let url = 'http://127.0.0.1:5000/roupas'
    fetch(url, {
        method: 'get'
      })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.roupas.forEach((item) => inserirLinha(item.id, item.nome, item.categoria, item.tamanho, item.valor_de_compra, item.valor_de_venda));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Função que consulta o preço pelo ID, via GET
const consultarPrecoItem = async(inputId) => {

    let url = `http://127.0.0.1:5000/roupa?id=${inputId}`
    try{
        const response = await fetch(url, {
        method: 'get'
      })
      
      const data = await response.json()

      if(data.message == 'Item não encontrado'){
        return 'error'
      }
      else {
        return data.valor_de_venda;
      }
      
    }
    catch(error){
        console.error('Error:', error);
    }
}


// Função que adiciona um bot
const removerLinha = (e) =>{
    const botao = e.target;
    botao.closest("tr").remove();
}

consultarItens();


// Função para adicionar um novo item no banco de dados via POST
const postarItem = async (inputNome, inputCategoria, inputTamanho, inputValorCompra, inputValorVenda) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('categoria', inputCategoria);
    formData.append('tamanho', inputTamanho);
    formData.append('valor_de_compra', inputValorCompra);
    formData.append('valor_de_venda', inputValorVenda);

    // debugar para ver se dados estao preenchidos corretamente
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    let url = 'http://127.0.0.1:5000/roupa'
    try{
        const response = await fetch(url, {
            method: 'post',
            body: formData
          })
        
        const data = await response.json();
        return data.id;
    }
    catch(error) {
        console.error('Error:', error);
    };
}

// Função para atualizar o preço de uma roupa, via PUT
const atualizarItem = async (inputId, inputNovoValorVenda) => {
    const formData = new FormData();
    formData.append('id', inputId);
    formData.append('valor_de_venda', inputNovoValorVenda);

    // debugar para ver se dados estao preenchidos corretamente
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    let url = 'http://127.0.0.1:5000/roupa'
    try{
        const response = await fetch(url, {
            method: 'put',
            body: formData
          })
        if(!response.ok){
            return 400;
        }
        else{
            return 200;
        }
    }
    catch(error) {
        console.error('Error:', error);
    };
}

// Função chamada para calcular um preço em moeda estrangeira, via GET no serviço externo

const converterMoeda = async (event) => {
    
    let inputId = document.getElementById("id_peca").value;
    let moeda = document.getElementById("moeda").value;

    x = 20

    if(!inputId){
        alert('Selecione um item para converter o seu valor em moeda estrangeira')
    }
    else{
        let precoReal = await consultarPrecoItem(inputId)
        if(precoReal == 'error'){
            alert('Selecione um ID válido')
        }
        else{
            let url = `https://api.apilayer.com/currency_data/convert?to=${moeda}&from=BRL&amount=${precoReal}`

            var myHeaders = new Headers();

  // TODO: Adicionar APIKey (fornecido na submissão do MVP) abaixo
            myHeaders.append("apikey", "");

            try{
                const response = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                });
                
                const data = await response.json();
                console.log(data)
                document.getElementById("valor").textContent = `R$ ${precoReal} = ${data.result.toFixed(2)} ${moeda}`
            }
            catch(error){
                console.error(error);
            }
            
            
        }
    }

    



}


// Função chamada quando um novo item é adicionado
const novoItem = async (event) => {

    let inputNome = document.getElementById("nome").value;
    let inputCategoria = document.getElementById("categoria").value;
    let inputTamanho = document.getElementById("tamanho").value;
    let inputValorCompra = document.getElementById("valor_compra").value;
    let inputValorVenda = document.getElementById("valor_venda").value;

    if(!inputNome || !inputValorCompra || !inputValorVenda ){
        alert('Todos os campos são obrigatórios!');
    }
    else{
        const produtoId = await postarItem(inputNome, inputCategoria, inputTamanho, inputValorCompra, inputValorVenda);
        let idDisplay;

        if(produtoId){
            idDisplay = produtoId;
        }
        else{
            idDisplay = "-"; // exibir um dash caso não esteja ligado ao servidor
        }
        
        inserirLinha(idDisplay, inputNome, inputCategoria, inputTamanho, inputValorCompra, inputValorVenda);
        alert('Item adicionado com sucesso!');    
    }

}

// Função chamada quando o preço de um item é atualizado
const atualizadoItem = async (event) => {

    let inputId = document.getElementById("id_conv").value;
    let inputNovoValorVenda = document.getElementById("novo_valor_venda").value;

    if(!inputId || !inputNovoValorVenda ){
        alert('Para atualizar o preço, preencha o id e o novo valor de venda');
    }
    else{
        try{
            let response = await atualizarItem(inputId, inputNovoValorVenda);
            if(response == 400){
                alert('ID inválido!')
            }
            else{
                alert('Preço atualizado com sucesso!'); 
            }
        }
        catch(error){
            alert('Erro ao atualizar produto!')
        }

        
           
    }

}

// Função para deletar um item no banco de dados, com requisição DELETE
const deletarItem = (id) => {
    let url = `http://127.0.0.1:5000/roupa?id=${id}`;
    fetch(url, {
        method: 'delete'
      })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Função para inserir produto na tabela
const inserirLinha = (id, inputNome, inputCategoria, inputTamanho, inputValorCompra, inputValorVenda) =>{
    var item = [id, inputNome, inputCategoria, inputTamanho, inputValorCompra, inputValorVenda]
    var tabela = document.getElementById("tabelaRoupas");
    var linha = tabela.insertRow();

    //loop para preencher a linha com os dados fornecidos
    var i = 0
    while(i < item.length){
        var dado = linha.insertCell(i);
        dado.textContent = item[i];
        i++;
    }
    // insere um botão 
    const ultimoElemento = linha.insertCell(-1);
    const botao = document.createElement("button");
    
    botao.className = "botao";
    botao.textContent = "Remover";
    botao.onclick = () => {
        const idParaApagar = linha.cells[0].textContent;
        let apagar = confirm(`Confirma que deseja apagar a roupa ${idParaApagar}?`)
        if(apagar){
            deletarItem(idParaApagar);
            linha.remove();            
        }
    }
    ultimoElemento.appendChild(botao);

    //reseta os campos de input para uma nova inserção
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "Casa";
    document.getElementById("tamanho").value = "0-3m";
    document.getElementById("valor_compra").value = "";
    document.getElementById("valor_venda").value = "";
}