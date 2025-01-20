"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicValidations = void 0;
const express_validator_1 = require("express-validator");
const topicValidations = () => {
    return [
        (0, express_validator_1.body)("title").exists().escape(),
        (0, express_validator_1.body)("content").exists().escape(),
    ];
};
exports.topicValidations = topicValidations;
