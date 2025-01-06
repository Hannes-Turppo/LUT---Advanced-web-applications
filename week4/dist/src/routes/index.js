"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const userData = await User_1.User.findOne({ name: id });
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});
router.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const userData = await User_1.User.findOne({ name: req.body.userName });
        if (userData) {
            userData.todos.push({ todo: req.body.todoInput });
            await userData.save();
        }
        else {
            const newUser = new User_1.User({
                name: req.body.userName,
                todos: [{ todo: req.body.todoInput }]
            });
            await newUser.save();
        }
        res.send(`Todo added successfully for user ${req.body.userName}.`);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});
router.delete('/delete', async (req, res) => {
    const userName = req.body.userName;
    try {
        const userData = await User_1.User.findOne({ name: userName });
        if (!userData) {
            res.status(404).json('User not found');
            return;
        }
        else {
            await User_1.User.deleteOne({ name: userName });
            res.send(`User deleted successfully.`);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});
router.delete("/update", async (req, res) => {
    const userName = req.body.userName;
    const todoID = req.body.todoID;
    console.log(req.body);
    try {
        let userData = await User_1.User.findOne({ name: userName });
        if (!userData) {
            res.status(404).json('User not found');
            return;
        }
        else {
            userData.todos = userData.todos.filter(todo => todo._id != todoID);
            console.log(userData);
            await userData.save();
            res.send(`Todo deleted successfully for user ${userName}.`);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});
exports.default = router;
