const form = document.getElementById('form');
const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hora = date.getHours();
const saudacao = document.getElementById('saudacao');
const LocalTasks = window.localStorage;

if (hora >= 0 && hora <= 12) {
	saudacao.innerHTML = '<strong class="saudacao">Bom dia,</strong>';
} else if (hora <= 18) {
	saudacao.innerHTML = '<strong class="saudacao">Boa Tarde,</strong>';
} else {
	saudacao.innerHTML = '<strong class="saudacao">Boa noite,</strong>';
}

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[month];

let tarefas = [];
let total = 0;
let concluidas = 0;

// Quando a página carregar, mostrar as tarefas guardadas
document.addEventListener('DOMContentLoaded', () => {
	carregarTarefas();
});

// Ao enviar o formulário, cria uma nova tarefa
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const nomeTarefa = document.querySelector('.inputTask').value.trim();
	if (nomeTarefa === '') return;

	const dataCriacao = "Criado em: " + today + " de " + monthString + " de " + year;

	const tarefa = {
		nome: nomeTarefa,
		descricao: '',
		concluida: false,
		data: dataCriacao
	};

	tarefas.push(tarefa);
	salvarTarefas();
	renderizarTarefas();

	form.reset();
});

// Salva o array completo no Local Storage
function salvarTarefas() {
	LocalTasks.setItem('tarefas', JSON.stringify(tarefas));
}

// Carrega as tarefas do Local Storage
function carregarTarefas() {
	const data = LocalTasks.getItem('tarefas');

	if (data) {
		tarefas = JSON.parse(data);
		renderizarTarefas();
	} else {
		mostrarNada();
	}
}

// Recria a lista de tarefas na tela
function renderizarTarefas() {
	const lista = document.getElementById('taskList');
	lista.innerHTML = '';

	total = tarefas.length;
	concluidas = tarefas.filter(t => t.concluida).length;

	if (total === 0) {
		mostrarNada();
		return;
	}

	for (let i = 0; i < tarefas.length; i++) {
		const tarefa = tarefas[i];

		const tarefaItem = document.createElement('div');
		if (tarefa.concluida) {
			tarefaItem.className = 'taskItemFinish';
		} else {
			tarefaItem.className = 'taskItem';
		}

		const inputCheck = document.createElement('input');
		inputCheck.type = 'checkbox';
		inputCheck.className = tarefa.concluida ? 'checkboxTaskFinish' : 'checkboxTask';
		inputCheck.checked = tarefa.concluida;

		const tarefaText = document.createElement('div');
		tarefaText.className = 'taskText';

		const nomeTarefaEl = document.createElement('p');
		nomeTarefaEl.textContent = tarefa.nome;
		if (tarefa.concluida) {
			nomeTarefaEl.className = 'taskNameFinish';
		} else {
			nomeTarefaEl.className = 'taskName';
		}

		const descriptionInput = document.createElement('input');
		descriptionInput.type = 'text';
		descriptionInput.placeholder = 'Adicione a descrição';
		descriptionInput.maxLength = 74;
		descriptionInput.value = tarefa.descricao;

		if (tarefa.concluida) {
			descriptionInput.className = 'inputDescriptionFinish';
		} else {
			descriptionInput.className = 'inputDescription';
		}

		const dataTarefaEl = document.createElement('p');
		dataTarefaEl.className = 'taskDate';
		dataTarefaEl.textContent = tarefa.data;

		const btnTrash = document.createElement('button');
		btnTrash.className = 'btnTrash';
		btnTrash.type = 'button';
		const trashImg = document.createElement('img');
		trashImg.src = 'files/trash.png';
		trashImg.alt = 'Excluir';
		btnTrash.appendChild(trashImg);

		tarefaText.appendChild(nomeTarefaEl);
		tarefaText.appendChild(descriptionInput);
		tarefaText.appendChild(dataTarefaEl);
		tarefaItem.appendChild(inputCheck);
		tarefaItem.appendChild(tarefaText);
		tarefaItem.appendChild(btnTrash);
		lista.appendChild(tarefaItem);

		atualizarContador();

		// Quando marcar a checkbox
		inputCheck.addEventListener('change', () => {
			if (inputCheck.checked) {
				tarefa.concluida = true;
				tarefa.data = "Concluído em: " + today + " de " + monthString + " de " + year;
			} else {
				tarefa.concluida = false;
				tarefa.data = "Criado em: " + today + " de " + monthString + " de " + year;
			}
			salvarTarefas();
			renderizarTarefas();
		});

		// Quando digitar na descrição
		descriptionInput.addEventListener('input', () => {
			tarefa.descricao = descriptionInput.value;
			salvarTarefas();
		});

		// Quando clicar na lixeira
		btnTrash.addEventListener('click', () => {
			tarefas.splice(i, 1);
			salvarTarefas();
			renderizarTarefas();
		});
	}
}

// Atualiza o texto do progresso
function atualizarContador() {
	const progressText = document.getElementById('progressText');
	progressText.innerHTML = concluidas + " de " + total + " <strong class='concluido'>concluídas</strong>";
}

// Mostra a mensagem quando não há tarefas
function mostrarNada() {
	const lista = document.getElementById('taskList');
	lista.innerHTML = '';
	const msg = document.createElement('p');
	msg.className = 'nothingMessage';
	msg.innerHTML = '😪 <br> Nenhum registro encontrado!';
	lista.appendChild(msg);

	const progressText = document.getElementById('progressText');
	if (progressText) {
		progressText.innerHTML = '';
	}
}
