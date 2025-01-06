"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const router = (0, express_1.Router)();
router.get("/private", validateToken_1.default, async (req, res) => {
    res.status(200).json({ message: "This is protected secure route!" });
});
exports.default = router;
