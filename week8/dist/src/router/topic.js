"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validateToken_1 = require("../middleware/validateToken");
const Topic_1 = require("../models/Topic");
const topicValidations_1 = require("../validators/topicValidations");
const router = express_1.default.Router();
router.get("/topic", async (req, res) => {
    try {
        const topics = await Topic_1.Topic.find();
        console.log(topics);
        res.status(200).json(topics);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error while getting topics" });
        return;
    }
});
router.post("/topic", validateToken_1.validateUser, (0, topicValidations_1.topicValidations)(), async (req, res) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty) {
        console.log(`Validation errors: ${validationErrors}`);
        res.status(400).json({ message: "Bad request" });
        return;
    }
    try {
        const user = req.user;
        console.log(user);
        await Topic_1.Topic.create({
            title: req.body.title,
            content: req.body.content,
            username: user.username,
            createdAt: Date.now()
        });
        res.status(200).json({ message: `Topic ${req.body.title} created` });
        return;
    }
    catch (error) {
        console.log(`Error while creating new topic: ${error}`);
        res.status(500).json({ message: "Server error while creating topic" });
        return;
    }
});
router.delete("/topic/:id", validateToken_1.validateAdmin, async (req, res) => {
    const user = req.user;
    if (!user.isAdmin) {
        res.status(403).json({ message: "Access denied." });
        return;
    }
    try {
        const topicID = req.params.id;
        console.log(topicID);
        const topic = await Topic_1.Topic.findOne({ _id: topicID });
        if (!topic) {
            res.status(404).json({ message: "invalid topicID" });
            return;
        }
        await Topic_1.Topic.deleteOne({ _id: topicID });
        res.status(200).json({ message: "Topic deleted successfully." });
        return;
    }
    catch (error) {
        console.log(`Error while deleting topic ${error}`);
        return;
    }
});
exports.default = router;
