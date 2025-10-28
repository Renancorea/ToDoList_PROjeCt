const form = document.getElementById('form');
const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

/*const hora = date.getHours();

const a = document.getElementById('saudacao');

if(0 < hora && hora < 12){
	
	a.innerHTML= '<strong id="saudacao" class="saudacao">Bom dia,</strong>';
	
}
else if(12 < hora && hora < 18){
	
	a.innerHTML= '<strong id="saudacao" class="saudacao">Boa Tarde,</strong>';
	
}
else{
	
	a.innerHTML= '<strong id="saudacao" class="saudacao">Boa noite,</strong>';
	
}
*/


const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[month];

let nomeTarefa = '';
let dataCriacao = '';
let dataconcluido = '';
let concluidas = 0;
let total = 0;

window.onload = function(){
    finalmensagem();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    nomeTarefa = document.querySelector('.nomeTarefa').value.trim();
 
    dataCriacao = "Criado em: " + today + " de " + monthString + " de " + year;
    dataconcluido = "concluído em: " + today + " de " + monthString + " de " + year;

    const finalDiv = document.querySelector('.final');
    finalDiv.innerHTML = '';

    total++;

    const lista = document.getElementById('lista-tarefa');

    const tarefaitem = document.createElement('div');
    tarefaitem.className = 'tarefa-item';

    const item_tarefa = document.createElement('div');
    item_tarefa.className = 'inputbox';

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.type = 'checkbox';

    const tarefa_inteira = document.createElement('div');
    tarefa_inteira.className = 'tarefa_inteira';

    const nomeTarefas = document.createElement('p');
    nomeTarefas.className = 'nomeTarefa';
    nomeTarefas.textContent = nomeTarefa;

    const dataTarefa = document.createElement('p');
    dataTarefa.className = 'dataTarefa';
    dataTarefa.textContent = dataCriacao;

    const button = document.createElement('button');
    button.className = 'lixeira';
    button.type = 'button';

    const imagem = document.createElement('img');
	imagem.src = "Assets/trash.png";
	button.appendChild(imagem);

    item_tarefa.appendChild(input);
    tarefa_inteira.appendChild(nomeTarefas);
    tarefa_inteira.appendChild(dataTarefa);
    tarefaitem.appendChild(item_tarefa);
    tarefaitem.appendChild(tarefa_inteira);
    tarefaitem.appendChild(button);
    lista.appendChild(tarefaitem);
    form.reset();

    const contador = document.querySelector('.contador');
    contador.innerHTML = `${concluidas} de ${total} <strong class="contadorVerde">concluídas</strong>`;
        

    input.addEventListener('change', (e) => {
        e.preventDefault();
        if (input.checked) {
            concluidas++;
            tarefaitem.className = 'tarefa-itemconcluida';
            nomeTarefas.className = 'nomeTarefaconcluida';
            dataTarefa.textContent = dataconcluido;
        } else {
            tarefaitem.className = 'tarefa-item';
            nomeTarefas.className = 'nomeTarefa';
            dataTarefa.textContent = dataCriacao;
            concluidas--;
            if (concluidas < 0) concluidas = 0;
        }
        contador.textContent = `${concluidas} de ${total}`;
    });
    button.addEventListener('click', (e) => {
        e.preventDefault
        if (input.checked) {
            concluidas--;
        }
        tarefaitem.remove();
        total--;
        contador.textContent = `${concluidas} de ${total}`;

        if (total == 0) {
            finalmensagem();

            const a = document.querySelector('.contador');
            a.innerHTML = '';
            const b = document.querySelector('.contadorVerde');
            b.innerHTML = '';
        }
        
        
        
    });
    
});
function finalmensagem(){
    
const finalDiv = document.querySelector('.final');
const final = document.createElement('p');
final.className = 'final';
final.innerHTML = '<p> 🙅‍♀️ <br>Nenhum registro encontrado!</p>';
finalDiv.appendChild(final);
}