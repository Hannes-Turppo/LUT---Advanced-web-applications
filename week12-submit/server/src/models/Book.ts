import mongoose, {Document, Schema} from "mongoose"

interface IBook extends Document {
    author: string
    name: string
    pages: number
}

const bookSchema = new Schema ({
    author: {type: String, required: true},
    name: {type: String, required: true},
    pages: {type: String, required: true}
})

const Book: mongoose.Model<IBook> = mongoose.model<IBook>("Book", bookSchema)

export {Book, IBook}
