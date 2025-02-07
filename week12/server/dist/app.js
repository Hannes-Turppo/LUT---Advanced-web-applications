"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_1 = __importDefault(require("./routes/book"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
const mongoDB = "mongodb://127.0.0.1:27017/FullStackDB";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on("connect", console.log.bind(console, "Connected to MongoDB"));
db.on("error", console.error.bind(console, "Connection to DB failed"));
const corsOptions = {
    origin: "http://127.0.0.1:3000",
    optionsSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use("/api", book_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
