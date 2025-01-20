"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const userValidation_1 = require("../validators/userValidation");
const router = express_1.default.Router();
router.post("/register", (0, userValidation_1.userValidators)(), async (req, res) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        console.log("Validation errors: ", validationErrors);
        return void res.status(400).json({ message: "bad request" });
    }
    console.log("req.body: ", req.body);
    try {
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(403).json({ email: "Email already in use" });
            return;
        }
        else {
            const salt = await bcrypt_1.default.genSalt(10);
            const hash = await bcrypt_1.default.hash(req.body.password, salt);
            await User_1.User.create({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                isAdmin: req.body.isAdmin
            });
            res.status(200).json({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                isAdmin: req.body.isAdmin
            });
            return;
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: `Server error while registering` });
        return;
    }
});
router.post("/login", (0, userValidation_1.userValidators)(), async (req, res) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty) {
        res.status(403).json({ message: "Bad request" });
        return;
    }
    try {
        const user = await User_1.User.findOne({ email: req.body.email });
        if (!user) {
            res.status(403).json({ message: "Bad request" });
            return;
        }
        else {
            if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
                const jwtPayload = {
                    _id: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin
                };
                const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: "2h" });
                res.status(200).json({ success: true, token });
                return;
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
    }
    catch (error) {
        console.log(`Server error while logging in: ${error}`);
        res.status(500).json({ message: "Server error while logging in." });
        return;
    }
});
exports.default = router;
