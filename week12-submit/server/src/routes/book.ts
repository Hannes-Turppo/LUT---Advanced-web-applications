import { Request, Response, Router } from "express";
import {Book, IBook} from "../models/Book"

const bookRouter: Router = Router()


bookRouter.post("/book", async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        // check if book is already in DB
        const existingBook: IBook | null = await Book.findOne({name: req.body.name})
        if (existingBook) {
            return void res.status(500).json({message: "Book already exists"})
        }

        // if no book is found
        Book.create({
            author: req.body.author,
            name: req.body.name,
            pages: req.body.pages
        })

        res.status(200).json({message: `Book '${req.body.name}' created`})
        return

    } catch (error: unknown) {
        console.error(`Error while saving book ${error}`)
    } 

})


export default bookRouter
