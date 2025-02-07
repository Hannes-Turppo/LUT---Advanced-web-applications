"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_1 = require("../models/Book");
const bookRouter = (0, express_1.Router)();
bookRouter.post("/book", async (req, res) => {
    console.log(req.body);
    try {
        const existingBook = await Book_1.Book.findOne({ name: req.body.name });
        if (existingBook) {
            return void res.status(500).json({ message: "Book already exists" });
        }
        Book_1.Book.create({
            author: req.body.author,
            name: req.body.name,
            pages: req.body.pages
        });
        res.status(200).json({ message: `Book '${req.body.name}' created` });
        return;
    }
    catch (error) {
        console.error(`Error while saving book ${error}`);
    }
});
exports.default = bookRouter;
