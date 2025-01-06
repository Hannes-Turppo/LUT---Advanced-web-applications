"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const Image_1 = require("../models/Image");
const multerConfig_1 = __importDefault(require("../middleware/multerConfig"));
const router = (0, express_1.Router)();
router.post("/upload", multerConfig_1.default.single("image"), async (req, res) => {
    const formData = await req.body;
    const file = req.file;
    let imageID;
    try {
        if (file) {
            console.log(file.path);
            const image = new Image_1.Image({
                filename: file.originalname,
                path: file.path,
            });
            const myImage = await image.save();
            imageID = myImage._id;
        }
        const offer = new Offer_1.Offer({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            imageId: imageID,
        });
        await offer.save();
        res.status(201).send("offer saved for " + offer.title);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("error saving offer");
    }
});
exports.default = router;
