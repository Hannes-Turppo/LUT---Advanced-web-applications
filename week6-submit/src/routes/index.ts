import { Request, Response, Router } from "express"
import multer from "multer";
import { Offer, IOffer } from "../models/Offer";
import {Image, IImage} from "../models/Image";
import upload from "../middleware/multerConfig";


// declare router
const router: Router = Router();

////////////////////////////////////////////////////
// routes
router.post("/upload", upload.single("image"),  async (req: Request, res: Response) => {
    const formData = await req.body;
    const file = req.file;
    let imageID;

    try {
        // handle image upload
        if (file) {
            console.log(file.path);
            const image: IImage = new Image({
                filename: file.originalname,
                path: file.path,
            })
            const myImage = await image.save();
            imageID = myImage._id;
        }

        // upload offer
        const offer: IOffer = new Offer({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            imageId: imageID,
        });
        await offer.save();
        res.status(201).send("offer saved for " + offer.title);

    } catch (error) {
        console.error(error);
        res.status(500).send("error saving offer");
    }

});
    



// export router
export default router