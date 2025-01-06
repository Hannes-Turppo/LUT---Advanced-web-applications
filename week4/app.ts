import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './src/routes/index';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';

const app: Express = express();
const port = 3000;

// database declaration
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"));
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "Yo fam, your server's gone to shit!\n"));



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Path to public
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use("/", router);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
