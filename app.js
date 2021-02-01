const zipCode = document.querySelector('#cep')
const street = document.querySelector('#logradouro')
const button = document.querySelector('button')



//inserindo os dados nos inputs correspondentes do form
const showDataApi = (result) => {
	for(const input in result){
		if(document.querySelector(`#${input}`)){
			document.querySelector(`#${input}`).value = result[input]
		}
		
	}
}

//dispara a busca pelo cep ao tirar o foco do input cep
zipCode.addEventListener('blur', (event) => {
		//retira o '-', caso seja inserido pelo usuário
		let zipCodeReplace = zipCode.value.replace("-","")
		//url para buscar os dados correspondente ao CEP digitado
		let urlApi = `https://viacep.com.br/ws/${zipCodeReplace}/json/`
		//requisição
		fetch(urlApi)
			.then(response => { response.json() //resposata no formato json
					.then(data => showDataApi(data))
			})
			.catch(event => alert(`Erro: ${event.message}`))		
})
