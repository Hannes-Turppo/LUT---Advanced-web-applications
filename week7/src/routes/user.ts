import {Request, Response, Router} from 'express'
import {body, header, Result, ValidationError, validationResult} from 'express-validator'
import {IUser} from '../models/User'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'


// ////////////////////////////////////////////////////////
// declare router
const router: Router = Router()

// declare userlist (why the fuck do we have to use a list???)
let userList: IUser[] = [];

// ////////////////////////////////////////////////////////
// helper functions

// check for existing user. return true if user exists, false otherwise
const checkForExistingUser = ( email: string ) => {
    if (userList.find((user) => user.email === email)) {
        return true
    } else return false
}


// ////////////////////////////////////////////////////////
// define routes for /api/user



// register new user
router.post('/register', 
    body('email').trim().isEmail().escape(),
    body('password').escape(),
    async ( req: Request, res: Response ) => {

        const errors: Result<ValidationError> = validationResult(req)
        // if express-validator finds errors, return 400
        if (!errors.isEmpty()) {
            console.log(errors.array())
            res.status(400).json({ errors: errors.array() })
            return 
        }

        try {

            // look for existing user with same email, if found return 403
            const userExists = checkForExistingUser(req.body.email)
            console.log(userExists)
            if (userExists) {
                console.log("Email is in use")
                res.status(403).json({ message: "Email is in use" })
                return

            } else {
                // if no existing user, hash password and create new user in BD

                const salt: string = await bcrypt.genSaltSync(10)
                const hash: string = await bcrypt.hashSync(req.body.password, salt)

                const newUser: IUser = {
                    email: req.body.email,
                    password: hash
                }
                userList.push({
                    email: newUser.email,
                    password: newUser.password
                });

                res.status(200).json(newUser)
                return
            }

        } catch (error: any) {
            res.status(500).json({ message: error.message })
            return 
        }

});

// login path
router.post('/login',
    body("email").trim().isEmail().escape(),
    body("password").escape(),
    async (req: Request, res: Response) => {
        try {
            // look for user in DB
            const user = userList.find((user) => user.email === req.body.email)
            if (!user) {
                res.status(401).json({ message: "invalid credentials" })
                return
            }
            // check password
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // create token
                console.log("passwords match")
                const jwtPayload: JwtPayload = {
                    email: user.email
                }
                const token = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: '1h' })

                res.status(200).json({success: true, token: token })

                return
            } else {
                res.status(401).json({ message: "invalid credentials" })
                return
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
            return
        }
});


// list all existing users
router.get("/list", async (req: Request, res: Response) => {
    try {
        // const users: IUser[] = await User.find()
        res.status(200).json(userList)
        return
    } catch (error: any) {
        res.status(500).json({ message: `error while fetching users: ${error}` })
        return
    }
})


// ////////////////////////////////////////////////////////
// export router
export default router
