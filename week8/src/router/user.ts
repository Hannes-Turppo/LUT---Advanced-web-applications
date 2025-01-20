import express, {Request, Response, Router} from 'express';
import { IUser, User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {body, Result, ValidationError, validationResult} from 'express-validator';
import {userValidators} from '../validators/userValidation';


// declare router
const router = express.Router();



// ///////////////////////////////////////////////////////////
// make new routes

// register
router.post("/register", userValidators(), async (req: Request, res: Response)=> {
        // check validations and return errors if any
        const validationErrors: Result<ValidationError> = validationResult(req);
        if(!validationErrors.isEmpty()){
            console.log("Validation errors: ", validationErrors);
            return void res.status(400).json({message: "bad request"});
        }

        console.log("req.body: ", req.body);

        // handle registration
        try {

            // check for existing user:
            const existingUser: IUser | null = await  User.findOne({email: req.body.email});
            if(existingUser){
                res.status(403).json({email: "Email already in use"});
                return
            } else {
                
                // if new user, hash password and save to db
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                

                await User.create({
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
                return
            }


        } catch (error: any) {
            console.log("Error: ", error);
            res.status(500).json({message: `Server error while registering`});
            return
        }
    }
);

// login
router.post("/login", userValidators(), async (req: Request, res: Response)=> {

        // check for errors in request validation
        const validationErrors :Result<ValidationError> = validationResult(req)
        if(!validationErrors.isEmpty) {
            res.status(403).json({message: "Bad request"})
            return
        }

        // if no validationErrors, handle login:
        try {
            // look for user:
            const user: IUser | null = await User.findOne({email: req.body.email})
            if (!user) { // if no user with provided email, return 401
                res.status(403).json({message: "Bad request"})
                return
            } else {
                if (bcrypt.compareSync(req.body.password, user.password as string)) {
                    // if valid credentials are provided, return json(JWT)

                    // JWT payload:
                    const jwtPayload: JwtPayload = {
                        _id: user._id,
                        username: user.username,
                        isAdmin: user.isAdmin
                    }

                    // create JWT:
                    const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, {expiresIn: "2h"})

                    // return
                    res.status(200).json({success: true, token})
                    return
                } else {
                    res.status(401).json({message: "Invalid credentials"})
                }
            }
        } catch (error: any) {
            console.log(`Server error while logging in: ${error}`)
            res.status(500).json({message: "Server error while logging in."})
            return
        }
})

// /////////////////////////////////////////////////
export default router;
