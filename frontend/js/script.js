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

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'delete',
    });
    loadTasks();
}

const updateTask = async (task) => {
    const { id, title, status } = task;
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, status }),
    })
    loadTasks();
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

const changeRowColor = (tr, status) => {
    if (status === "Concluido") {
        tr.style.backgroundColor = "lightgreen";
    } else if (status === "pending") {
        tr.style.backgroundColor = "lightcoral";
    } else {
        tr.style.backgroundColor = "lightblue"; // volta ao normal
    }
};

const moveRow = (tr, status) => {
    if (status === "pending") {
        tbody.prepend(tr); // vai pro topo
    } else if (status === "em andamento") {
        // procura o último "pending" e insere depois dele
        const pendings = [...tbody.querySelectorAll('tr')]
            .filter(row => row.querySelector('select').value === "pending");

        if (pendings.length > 0) {
            pendings[pendings.length - 1].after(tr);
        } else {
            tbody.prepend(tr);
        }
    } else if (status === "Concluido") {
        tbody.appendChild(tr); // vai pro final
    }
};

const formatDate = (dateUTC) => {
    const options = { DataStyle: 'long', TimeStyle: 'short' };
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
    select.addEventListener('change', ({ target }) => updateTask({ id, title, created_at, status: target.value }));
    // select.addEventListener('change', ({ target }) => {
    //     const newStatus = target.value;
    //     updateTask({ id, title, created_at, status: newStatus });

    //     // muda a cor da linha
    //     changeRowColor(tr, newStatus);

    //     // reposiciona a linha
    //     moveRow(tr, newStatus);
    // });

    //botões de ação
    const editButton = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined"> delete </span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;

    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, title: editInput.value, status, });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });

    editButton.className = 'btn-action';
    deleteButton.className = 'btn-action';
    deleteButton.addEventListener('click', () => deleteTask(id));
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tdStatus.appendChild(select);

    changeRowColor(tr, status);
    //montando a linha
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);

    if (status === "pending") {
        tbody.prepend(tr); // vai pro topo
    } else if (status === "em andamento") {
        // procura o último "pending" e insere depois dele
        const pendings = [...tbody.querySelectorAll('tr')]
            .filter(row => row.querySelector('select').value === "pending");

        if (pendings.length > 0) {
            pendings[pendings.length - 1].after(tr);
        } else {
            tbody.prepend(tr);
        }
    } else if (status === "Concluido") {
        tbody.appendChild(tr); // vai pro final
    }
}

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';
    tasks.forEach((task) => createRow(task));
}

addForm.addEventListener('submit', addTask);

loadTasks();