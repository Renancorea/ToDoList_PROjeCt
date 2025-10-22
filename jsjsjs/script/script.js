const form = document.getElementById('form');
const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[month];

let nomeTarefa = '';
let dataCriacao = '';

let concluidas = 0;
let total = 0;

// pesquisei pra saber essa viu samuel
document.addEventListener('DOMContentLoaded', () => {
	mostrarNada();
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	nomeTarefa = document.querySelector('.inputTask').value.trim();

	dataCriacao = "Criado em: "+ today + " de " + monthString + " de " + year;

	total++;

	const lista = document.getElementById('taskList');

	// Remove mensagem a mensagem la de baixo se tiver alguma tarefa
	const msgAntiga = document.querySelector('.nothingMessage');
	if (msgAntiga){
		msgAntiga.remove();
	} 

	// Criação dos elementos da tarefa
	//a alteração pra const e colocar nesse modelo abaixo foi ideia do chat pois fica mais "estavel"
	const tarefaItem = document.createElement('div');
	tarefaItem.className = 'taskItem';

	const boxCheck = document.createElement('div');
	boxCheck.className = 'boxCheck';

	const inputCheck = document.createElement('input');
	inputCheck.type = 'checkbox';
	inputCheck.className = 'checkboxTask';

	const tarefaText = document.createElement('div');
	tarefaText.className = 'taskText';

	const nomeTarefaEl = document.createElement('p');
	nomeTarefaEl.className = 'taskName';
	nomeTarefaEl.textContent = nomeTarefa; // pra não usar o innerHTML, ideia do chat denovo Samuel

	const dataTarefaEl = document.createElement('p');
	dataTarefaEl.className = 'taskDate';
	dataTarefaEl.textContent = dataCriacao;

	const btnTrash = document.createElement('button');
	btnTrash.className = 'btnTrash';
	btnTrash.type = 'submit';

	const trashImg = document.createElement('img');
	trashImg.src = 'files/trash.png';
	trashImg.alt = 'Excluir';
	btnTrash.appendChild(trashImg);

	// Criação da tarefinha la no HTMLLLLLL
	boxCheck.appendChild(inputCheck);
	tarefaText.appendChild(nomeTarefaEl);
	tarefaText.appendChild(dataTarefaEl);
	tarefaItem.appendChild(boxCheck);
	tarefaItem.appendChild(tarefaText);
	tarefaItem.appendChild(btnTrash);
	lista.appendChild(tarefaItem);

	// cria o contador
	const progressText = document.getElementById('progressText');
	progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;
	//inicia com 0 o comcluidas porque não tem como ja ter marcado 


	// Pra mexer toda vez que Clicar na checkbox
	inputCheck.addEventListener('change', () => {
		if (inputCheck.checked) {
			inputCheck.className = 'checkboxTaskFinish'; // pra  ficar verde
			tarefaItem.className = 'taskItemFinish';
			nomeTarefaEl.className = 'taskNameFinish';
			dataCriacao = "Concluído em: "+ today + " de " + monthString + " de " + year;
			dataTarefaEl.textContent = dataCriacao;
			tarefaText.appendChild(dataTarefaEl);
			concluidas++;
		} else {
			inputCheck.className = 'checkboxTask'; // pra ficar normal denovo kkkk
			tarefaItem.className = 'taskItem';
			nomeTarefaEl.className = 'taskName';
			dataCriacao = "Criado em: "+ today + " de " + monthString + " de " + year;
			dataTarefaEl.textContent = dataCriacao;
			tarefaText.appendChild(dataTarefaEl);
			concluidas--;
		}
		progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;
		//adiciona depois de atualizar a frescura todinha

	});

	// pra sumir toda vez que clicar na lixeira e atualizar o contator la
	btnTrash.addEventListener('click', (e) => {
		e.preventDefault();
		if (inputCheck.checked){
			concluidas--; // se a removida for marcada pra diminuir tb
		} 
		total--;
		tarefaItem.remove(); // como isso remove tudo eu não sei

		if (total > 0) {
			progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;
		} else {
			mostrarNada(); // função pra mostrar a mensagem, era o melhhor jeito de fazer isso, porque la no inicio tem que inicializar tb
		}
	});

	form.reset(); // ERA SO ISSO PRA APAGAR O FORRRM Que coisa
});

// so pra mostrar a mensagemzinha ai
function mostrarNada() {
	const lista = document.getElementById('taskList');
	lista.innerHTML = ''; // limpa a lista
	const msg = document.createElement('p');
	msg.className = 'nothingMessage';
	msg.innerHTML = '😪 <br> Nenhum registro encontrado!';
	lista.appendChild(msg);

	// Remove o marcador de concluidas, se a mensagem vai aparecer é porque não tem nenhuma
	const progressText = document.getElementById('progressText');
	if (progressText){
		progressText.innerHTML = ''; // so pra não ficar apagando oque não existe
	}
}
