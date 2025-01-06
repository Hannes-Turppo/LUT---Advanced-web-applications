// imports
import express, {Express} from 'express';
import path from 'path';
import morgan from 'morgan';
import router from "./src/routes/index";
import mongoose, {Connection} from 'mongoose';


const app: Express = express();
const PORT: number = 3000;

// database
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"));
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

// declare public
app.use(express.static(path.join(__dirname, "../public")));

// router
app.use("/", router);


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
