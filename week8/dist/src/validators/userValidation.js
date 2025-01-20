"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const express_validator_1 = require("express-validator");
const userValidators = () => {
    return [
        (0, express_validator_1.body)("email").escape().trim().isEmail(),
        (0, express_validator_1.body)("password")
            .escape()
            .isLength({ min: 8 })
            .matches(/[A-Z]/).withMessage("")
            .matches(/[a-z]/).withMessage("")
            .matches(/[0-9]/).withMessage("")
            .matches(/[#!&?]/).withMessage(""),
        (0, express_validator_1.body)("username").escape().trim(),
        (0, express_validator_1.body)("isAdmin").escape().trim()
    ];
};
exports.userValidators = userValidators;
