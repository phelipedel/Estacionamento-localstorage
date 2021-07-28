
document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e){
	
	var modeloVeiculo = document.getElementById('modeloVeiculo').value;
	var placaVeiculo = document.getElementById('placaVeiculo').value;
	var horaEntrada = new Date();
	var nomec = document.getElementById('nomeCliente').value;
	var telefonec = document.getElementById('telCliente').value
	var ids = 1

	if(!modeloVeiculo && !placaVeiculo){
		
		alert("Preencha todos os campos!");
		return false;
	} 
	// criando um objetivo que vai conter as infomacoes do carro
	var veiculo = {
		modelo: modeloVeiculo,
		placa: placaVeiculo,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes(),
		nome: nomec,
		telefone: telefonec
		
		
	};
	// salvando os dados no navegados do cliente 
	if(localStorage.getItem('patio') === null){
		var veiculos = [];
		veiculos.push(veiculo);
		//convertendo objeto para armazenar em string 
		localStorage.setItem('patio', JSON.stringify(veiculos)); 
	} else {
		// retornando em objeto novamente 
		var veiculos = JSON.parse(localStorage.getItem('patio'));
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	}

	document.getElementById('formulario').reset();

	mostraPatio();
	console.log(carro);
	e.preventDefault();
}
// removendo o veiculo 
function removeVeiculo(placa){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
		
	}
	

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
	alert('Veiculo Removido')
}


function mostraPatio(){
	var veiculos = JSON.parse(localStorage.getItem('patio'));
	var patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	


	//apresentando os dados 
	
	for(var i = 0; i < veiculos.length; i++){
		var nome = veiculos[i].nome;
		var telefone = veiculos[i].telefone;
		var modelo = veiculos[i].modelo;
		var placa = veiculos[i].placa;
		var hora = veiculos[i].hora;
		var minutos = veiculos[i].minutos;
		 patioResultado.innerHTML += '<tr><td>'+ nome + '</td>'+
		 							 	  '<td>'+ telefone + '</td>' +
											'<td>'+ modelo + '</td>' +
											'<td>'+ placa + '</td>' +
		 							 	  '<td>'+ hora + ':' + minutos + '</td>' +
		 							 	  '<td><button onclick="removeVeiculo(\''+ placa +'\')" class="deletar">Remover</button></td>'+
		 							 '</tr>';

	
	}
}

