const inputTarefa = document.querySelector('#input');
const bttn = document.querySelector('.add');
const list = document.querySelector('.list');

let tasksListadas = [];

bttn.addEventListener('click', (e) => {
    //Previne que a página seja recarregada
    e.preventDefault();

    //Um Objeto que cria todos os elementos HTML
    const task = {
        divTask: document.createElement('div'),
        label: document.createElement('label'),
        divDescription: document.createElement('div'),
        textArea: document.createElement('textarea'),
        divBttnTask: document.createElement('div'),
        trash: document.createElement('img'),
    };

    //Chama a função para montar os elementos em forma de task
    montagem(task); 
    
    //Adiciona o Objeto task depois de montado para um Array
    tasksListadas.push(task);
    
    //Chama a função com um addEventListener preparado no simbolo de lixeira
    apagarTask(task);
});

function apagarTask(task) {
    //Adiciona um evento de clique para filtrar a Array onde estão os Objetos que representam as tasks
    task.trash.addEventListener('click', () => {
        tasksListadas = tasksListadas.filter(element => {
            return element.label.textContent !== task.label.textContent;
        });

        // limpando o HTML onde se encontram as tasks listadas
        list.innerHTML = '';

        // iterando sobre todos os objetos da Array e chamando a função para montar no HTML novamente a nova lista de tasks
        tasksListadas.forEach((elem) => {
            montagem(elem, elem.label.textContent);
        });
    });
};

function montagem(task, text = inputTarefa.value) {
    list.appendChild(task.divTask);
    task.divTask.classList.add('task');

    task.divTask.appendChild(task.label);
    task.label.setAttribute('for', 'description');
    task.label.textContent = `${text}`;

    task.divTask.appendChild(task.divDescription);
    task.divDescription.classList.add('description');

    task.divDescription.appendChild(task.textArea);
    task.textArea.setAttribute('id', 'descriptionText');
    task.textArea.setAttribute('cols', '45');
    task.textArea.setAttribute('rows', '2');
    task.textArea.setAttribute('placeholder', 'Descrição da tarefa...');
    task.textArea.setAttribute('maxlength', '60');

    task.divDescription.appendChild(task.divBttnTask);
    task.divBttnTask.classList.add('bttnTask');

    task.divBttnTask.appendChild(task.trash);
    task.trash.setAttribute('src', 'assets/images/trash-vector.svg');
    task.trash.setAttribute('alt', 'trash icon');
}