

const form = document.getElementById('form');
const a = document.getElementById('saudacao');
const LocalStorage = window.localStorage;

// --- Saudação ---
const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hora = date.getHours();

if (hora >= 0 && hora <= 12) {
  a.innerHTML = '<strong class="saudacao">Bom dia,</strong>';
} else if (hora > 12 && hora <= 18) {
  a.innerHTML = '<strong class="saudacao">Boa tarde,</strong>';
} else {
  a.innerHTML = '<strong class="saudacao">Boa noite,</strong>';
}

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[month];

let nomeTarefa = '';
let dataCriacao = '';
let check = false;
let concluidas = 0;
let total = 0;



let contadorTarefas = parseInt(LocalStorage.getItem('contadorTarefas')) || 0;

// --- Ao carregar a página ---
document.addEventListener('DOMContentLoaded', () => {
  mostrarNada();

  for (let i = 1; i <= contadorTarefas; i++) {
    const tarefa = JSON.parse(LocalStorage.getItem('tarefa' + i));
    if (tarefa) {
      nomeTarefa = tarefa[0];
      dataCriacao = tarefa[1];
      check = tarefa[2];
	  total = tarefa[3]
      CriarTarefa(false, i); // false = nao salvar de novo no localStorage  realizacao total

    }
  }
});

// --- Coleta dados do formulário ---
function coletar() {
  nomeTarefa = document.querySelector('.inputTask').value.trim();
  dataCriacao = "Criado em: " + today + " de " + monthString + " de " + year;
  check = false;
  return [nomeTarefa, dataCriacao, check];
}

// --- Cria nova tarefa ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  coletar();
  total++;
  contadorTarefas++;
  LocalStorage.setItem('contadorTarefas', contadorTarefas);
  CriarTarefa(true, contadorTarefas);
});

// --- Função principal de criação ---
function CriarTarefa(salvar, contador) {
  const lista = document.getElementById('taskList');

  // Remove mensagem "Nenhum registro encontrado"
  const msgAntiga = document.querySelector('.nothingMessage');
  if (msgAntiga) {
    msgAntiga.remove();
  }

  // --- Criação dos elementos ---
  const tarefaItem = document.createElement('div');
  tarefaItem.className = 'taskItem';

  const boxCheck = document.createElement('div');
  boxCheck.className = 'boxCheck';

  const inputCheck = document.createElement('input');
  inputCheck.type = 'checkbox';
  inputCheck.className = 'checkboxTask';
  inputCheck.checked = check;

  const tarefaText = document.createElement('div');
  tarefaText.className = 'taskText';

  const nomeTarefaEl = document.createElement('p');
  nomeTarefaEl.className = 'taskName';
  nomeTarefaEl.textContent = nomeTarefa;

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

  // --- Monta tarefa no HTML ---
  boxCheck.appendChild(inputCheck);
  tarefaText.appendChild(nomeTarefaEl);
  tarefaText.appendChild(dataTarefaEl);
  tarefaItem.appendChild(boxCheck);
  tarefaItem.appendChild(tarefaText);
  tarefaItem.appendChild(btnTrash);
  lista.appendChild(tarefaItem);

  // --- Atualiza contador ---
  const progressText = document.getElementById('progressText');
  progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;

  // --- Evento de marcar tarefa ---
  inputCheck.addEventListener('change', () => {
    if (inputCheck.checked) {
      tarefaItem.className = 'taskItemFinish';
      nomeTarefaEl.className = 'taskNameFinish';
      inputCheck.className = 'checkboxTaskFinish';
      dataCriacao = "Concluído em: " + today + " de " + monthString + " de " + year;
      concluidas++;
    } else {
      tarefaItem.className = 'taskItem';
      nomeTarefaEl.className = 'taskName';
      inputCheck.className = 'checkboxTask';
      dataCriacao = "Criado em: " + today + " de " + monthString + " de " + year;
      concluidas--;
    }

    dataTarefaEl.textContent = dataCriacao;
    progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;

    const tarefaData = [nomeTarefaEl.textContent, dataTarefaEl.textContent, inputCheck.checked];
    LocalStorage.setItem('tarefa' + contadorTarefas, JSON.stringify(tarefaData));
  });

  // --- Botão de exclusão ---
  btnTrash.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputCheck.checked) {
      concluidas--;
    }
	localStorage.removeItem('tarefa'+ contador)
    tarefaItem.remove();
    total--;

    if (total > 0) {
      progressText.innerHTML = `${concluidas} de ${total} <strong class="concluido">concluídas</strong>`;
    } else {
      mostrarNada();
    }
  });

  // --- Salva tarefa no localStorage se for nova ---
  if (salvar) {
    const tarefa = [nomeTarefaEl.textContent, dataTarefaEl.textContent, inputCheck.checked,total];
    LocalStorage.setItem('tarefa' + contadorTarefas, JSON.stringify(tarefa));
  }

  form.reset();
}

// --- Exibe mensagem quando não há tarefas ---
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
