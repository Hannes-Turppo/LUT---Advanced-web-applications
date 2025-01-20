"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./src/router/user"));
const topic_1 = __importDefault(require("./src/router/topic"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const mongoDB = process.env.MONGODB;
mongoose_1.default.connect(mongoDB);
const db = mongoose_1.default.connection;
db.on("connected", () => {
    console.log("Connected to MongoDB");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api/user", user_1.default);
app.use("/api", topic_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
