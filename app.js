const zipCode = document.querySelector('#cep')
const button = document.querySelector('.button')
const street = document.querySelector('#logradouro')
const neighborhood = document.querySelector('#bairro')
const city = document.querySelector('#localidade')
const state = document.querySelector('#uf')



//inserindo os dados nos inputs correspondentes do form
const showDataApi = (result) => {

	for (const input in result) {
		if (document.querySelector(`#${input}`)) {
			document.querySelector(`#${input}`).value = result[input]
		}
	}
	objEndereco()		
}

	//objeto com os dados do endereço
	const objEndereco = () => ({
		rua: logradouro.value, 
		bairro: bairro.value,
		city: localidade.value,
		UF: uf.value
	})



//dispara a busca pelo cep ao tirar o foco do input cep
zipCode.addEventListener('blur', (event) => {
	//retira o '-', caso seja inserido pelo usuário
	let zipCodeReplace = zipCode.value.replace("-", "")
	//url para buscar os dados correspondente ao CEP digitado
	let urlApi = `https://viacep.com.br/ws/${zipCodeReplace}/json/`
	//requisição
	fetch(urlApi)
		.then(response => {
			response.json() //resposata no formato json
				.then(data => showDataApi(data))

				
		})
		.catch(event => alert(`Erro: ${event.message}`))
})


// função que cadastra endereço no localStorage
const cadastrarEndereco = objEndereco => {
	localStorage.setItem('endereco', JSON.stringify(objEndereco()))
}


//cadastando endereço em localStorage
button.addEventListener('click', (event) => {
	event.preventDefault()
	cadastrarEndereco(objEndereco)
})

