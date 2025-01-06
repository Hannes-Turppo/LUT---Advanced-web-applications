// fetch todos from the server API for a specific person
const fetchTodos = async (name) => {
    const response = await fetch(`http://localhost:3000/todos/${name}`);
    const data = await response.json();
    return data;
}

const clearFields = () => {
    document.getElementById('userInput').value = "";
    document.getElementById('todoInput').value = "";
    document.getElementById('searchInput').value = "";
}

// delete a todo from the server API for a specific person
const deleteTodo = async (name, todoID) => {
    const response = await fetch(`http://localhost:3000/update`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: name, 
            todoID: todoID,
        })
    });
    const data = await response.text();
    return data;
}

const displayTodos = (user) => {
    const todos = user.todos;
    const userName = user.name;

    const todoContainer = document.getElementById('todoContainer');
    const todoList = document.createElement('ul');
    todoList.id = 'todoList';
    const userHeader = document.createElement('th');

    todoContainer.innerHTML = "";
    userHeader.innerHTML = userName + '\'s Todos';

    todos.forEach(todo => {
        let newTodoElement = document.createElement('li');
        let todoDelete = document.createElement('input');
        todoDelete.type = 'button';
        todoDelete.value = todo.todo;
        todoDelete.className = "delete-task";
        todoDelete.addEventListener('click', async () => {
            await deleteTodo(userName, todo._id);
            const updatedUser = await fetchTodos(userName);
            displayTodos(updatedUser);
        });
        newTodoElement.appendChild(todoDelete);
        todoList.appendChild(newTodoElement);
    });
    todoContainer.appendChild(userHeader);
    todoContainer.appendChild(todoList);
    clearFields();
}

// search for existing user
const searchButton = document.getElementById('search');
searchButton.addEventListener('click', async (event) => {
    const searchInput = document.getElementById('searchInput').value;
    const user = await fetchTodos(searchInput);
    if (user.message === "User not found") {
        const responseContainer = document.getElementById('response');
        responseContainer.innerHTML = user.message;
        console.log(user.message);
        return;
    }
    console.log(user);
    displayTodos(user);
    
});


// add new user
const addTodoButton = document.getElementById('submit-data');
addTodoButton.addEventListener('click', async (event) => {
    const name = document.getElementById('userInput').value;
    const todo = document.getElementById('todoInput').value;
    const response = await fetch(`http://localhost:3000/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: name, todoInput: todo})
    });

    const responseContainer = document.getElementById('response');
    responseContainer.innerHTML = "";
    responseContainer.innerHTML = await response.text();
    clearFields();
});


// delete existing user
deleteUserButton = document.getElementById('deleteUser');
deleteUserButton.addEventListener('click', async (event) => {
    const userName = document.getElementById('userInput').value;
    const todoContainer = document.getElementById('todoContainer');

    const response = await fetch(`http://localhost:3000/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: userName})
    });
    console.log(response);
    
    const responseContainer = document.getElementById('response');
    responseContainer.innerHTML = "";
    responseContainer.innerHTML = await response.text();
    todoContainer.innerHTML = "";
});
