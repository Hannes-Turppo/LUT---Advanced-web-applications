import {Request, Response, Router} from 'express'
import {body, header, Result, ValidationError, validationResult} from 'express-validator'
import {IUser} from '../models/User'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import validateToken from '../middleware/validateToken'
// ////////////////////////////////////////////////////////

// declare router
const router: Router = Router()


// user login trough JWT
router.get("/private", validateToken, async (req: Request, res: Response) => {
    res.status(200).json({message: "This is protected secure route!"})
    
});

export default router
