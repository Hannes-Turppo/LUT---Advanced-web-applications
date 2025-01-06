"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Reads data from JSON on server and returns TUser[]
const getTodos = () => {
    let res = "";
    let todos = [];
    try {
        res = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../data.json"), 'utf8');
    }
    catch (err) {
        console.error("Error reading file ", err);
    }
    try {
        todos = JSON.parse(res);
    }
    catch (err) {
        console.error("Error parsing JSON ", err);
    }
    return todos;
};
// find todos for specific user
const findTodos = (userName) => {
    const todos = getTodos();
    const user = todos.find(user => user.name === userName);
    if (user) {
        return user.todos;
    }
    else {
        return [];
    }
};
// Add data from form to JSON
const saveToDo = (userName, todo) => {
    const filePath = path_1.default.join(__dirname, '../../data.json');
    let currentTodos = getTodos();
    // Add new todo
    let user = currentTodos.find(user => user.name === userName);
    if (user) {
        user.todos.push(todo);
    }
    else {
        currentTodos.push({ name: userName, todos: [todo] });
    }
    // Write to file
    fs_1.default.writeFileSync(filePath, JSON.stringify(currentTodos, null, 2));
    console.log('Data saved');
};
////////////////////////////////////////////////////////////////// Router functionality
// get currently existing todos
router.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const userTodos = findTodos(id);
    if (userTodos.length === 0) {
        res.send(`User not found`);
    }
    else {
        res.json(userTodos);
    }
});
// Add new todo
router.post('/add', (req, res) => {
    const userName = req.body.userName;
    const todo = req.body.todoInput;
    console.log(`User Name: ${userName}, To-Do: ${todo}`);
    saveToDo(userName, todo);
    res.send(`Todo added successfully for user ${userName}.`);
});
exports.default = router;
