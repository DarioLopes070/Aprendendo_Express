const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks')
    const tasks = await response.json();
    return tasks
}

const addTask = async (event) => {
    event.preventDefault();
    const task = { title: inputTask.value }
    await fetch('http://localhost:3000/tasks', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task),
    });
    loadTasks();
    inputTask.value = '';
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    } else if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element

}

const createSelect = (value) => {
    const options = `
    <option value="pending">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="Concluido">concluído</option>
    `;
    const select = createElement('select', '', options);
    select.value = value;
    return select;

}

const formatDate = (dateUTC) => {
    const options = {DataStyle: 'long', TimeStyle: 'short'};
    const date = new Date(dateUTC).toLocaleString(options);
    return date;

}
const task = {
    id: 1,
    title: 'Estudar Node.js',
    created_at: '2024-06-20T12:00:00Z',
    status: 'concluída'
}
const createRow = (task) => {
    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');
    const select = createSelect(status);

    //botões de ação
    const editButton = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined"> delete </span>');
    editButton.className = 'btn-action';
    deleteButton.className = 'btn-action';
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tdStatus.appendChild(select);

    //montando a linha
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
}

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';
    tasks.forEach((task) => createRow(task));
}

addForm.addEventListener('submit', addTask);

loadTasks();