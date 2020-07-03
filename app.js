// Definir UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListeners
loadEventListeners();

// Load all eventListeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // adicionar tarefa
    form.addEventListener('submit', addTask);
    // remover tarefa
    taskList.addEventListener('click', removeTask);
    // limpar todos
    clearBtn.addEventListener('click', clearTasks);
    // filtrar tarefas
    filter.addEventListener('keyup', filterTasks);

}

function addTask(e){
    if(taskInput.value != ''){

    //criar li element.
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create textNode e append.
    li.appendChild(document.createTextNode(taskInput.value));

    // criar link para fechar
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Adicionar icone
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // append li para ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //limpar o input
    taskInput.value = '';

    }else{
        alert('Adicione uma tarefa');
    }

    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Tem Certeza?')){
            e.target.parentElement.parentElement.remove();
            //Remover task do localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

function clearTasks(){
    if(taskList.children[0] != null){
        if(confirm('Tem Certeza?')){
            // taskList.innerHTML = '';
            // Remove child é mais rápido
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
            }
        }
    
    // Limpar tudo do Local Storage
    clearTasksFromLocalStorage();

    }else{
        alert('Lista já está vazia')
    }


}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // Usando get elementBy... retorna uma colecao de html, que deve ser convertido para uma array,
    // fazendo com o querySelectorAll, ja retorna uma NoleList.
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        // indexOf() -> retorna 0 se for igual e -1 se for diferente;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

// Guardar no local storage
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// pegar tasks do local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    })
};

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function clearTasksFromLocalStorage(){
    localStorage.clear();
}