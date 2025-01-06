"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
let userList = [];
const checkForExistingUser = (email) => {
    if (userList.find((user) => user.email === email)) {
        return true;
    }
    else
        return false;
};
router.post('/register', (0, express_validator_1.body)('email').trim().isEmail().escape(), (0, express_validator_1.body)('password').escape(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const userExists = checkForExistingUser(req.body.email);
        console.log(userExists);
        if (userExists) {
            console.log("Email is in use");
            res.status(403).json({ message: "Email is in use" });
            return;
        }
        else {
            const salt = await bcrypt_1.default.genSaltSync(10);
            const hash = await bcrypt_1.default.hashSync(req.body.password, salt);
            const newUser = {
                email: req.body.email,
                password: hash
            };
            userList.push({
                email: newUser.email,
                password: newUser.password
            });
            res.status(200).json(newUser);
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
router.post('/login', (0, express_validator_1.body)("email").trim().isEmail().escape(), (0, express_validator_1.body)("password").escape(), async (req, res) => {
    try {
        const user = userList.find((user) => user.email === req.body.email);
        if (!user) {
            res.status(401).json({ message: "invalid credentials" });
            return;
        }
        if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
            console.log("passwords match");
            const jwtPayload = {
                email: user.email
            };
            const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token: token });
            return;
        }
        else {
            res.status(401).json({ message: "invalid credentials" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
router.get("/list", async (req, res) => {
    try {
        res.status(200).json(userList);
        return;
    }
    catch (error) {
        res.status(500).json({ message: `error while fetching users: ${error}` });
        return;
    }
});
exports.default = router;
