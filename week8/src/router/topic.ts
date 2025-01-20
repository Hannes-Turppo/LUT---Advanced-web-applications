import express, {Request, Response, Router} from 'express';
import bcrypt from 'bcrypt';
import jwt, {JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import {body, Result, ValidationError, validationResult} from 'express-validator';
import { validateUser, validateAdmin } from "../middleware/validateToken";
import { ITopic, Topic } from "../models/Topic";
import {topicValidations} from "../validators/topicValidations"

// declare router: 
const router: Router = express.Router();

// ///////////////////////////////////////////////////////////
// new routes:

// get all topics:
router.get("/topic", async(req: Request, res: Response) => {

    try {
        const topics: ITopic[] | undefined = await Topic.find();
        console.log(topics);

        res.status(200).json(topics)
        return

    } catch (error: any) {
        res.status(500).json({message: "Server error while getting topics"})
        return
    }
});

// post new topic
router.post("/topic", validateUser, topicValidations(), async(req: Request, res: Response) => {
    
    const validationErrors: Result<ValidationError> = validationResult(req);
    if (!validationErrors.isEmpty) {
        console.log(`Validation errors: ${validationErrors}`)
        res.status(400).json({message: "Bad request"})
        return
    }

    try {
        const user: any = req.user
        console.log(user);

        await Topic.create({
            title: req.body.title,
            content: req.body.content,
            username: user.username,
            createdAt: Date.now()
        });

        res.status(200).json({message: `Topic ${req.body.title} created`})
        return

    } catch (error: any) {
        console.log(`Error while creating new topic: ${error}`);
        res.status(500).json({message: "Server error while creating topic"});
        return;
    }
    
});

// delete topic based on ID
router.delete("/topic/:id", validateAdmin, async(req: Request, res: Response) => {
    
    const user: any = req.user
    if (!user.isAdmin) {
        res.status(403).json({message: "Access denied."})
        return
    }

    try {
        
        const topicID: string = req.params.id;
        console.log(topicID)

        const topic: ITopic | null = await Topic.findOne({_id: topicID})
        if (!topic) {
            res.status(404).json({message: "invalid topicID"})
            return
        }

        await Topic.deleteOne({_id: topicID})

        res.status(200).json({message: "Topic deleted successfully."})
        return

    } catch (error: any) {
        console.log(`Error while deleting topic ${error}`)
        return
    }

});

// ///////////////////////////////////////////////////////////
export default router;
