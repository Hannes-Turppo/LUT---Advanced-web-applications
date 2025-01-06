import {Request, Response, NextFunction} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

interface PrivateRequest extends Request {
    email?: JwtPayload
}

const validateToken = (req: PrivateRequest, res: Response, next: NextFunction) => {
    // get token from request header
    const token: string | undefined = req.header('authorization')?.split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "Access denied, invalid token" })
        return
    }


    // check if token is valid
    try{
        const payLoad: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        req.email = payLoad
        next()

    } catch (error) {
        res.status(401).json({ message: "Access denied, invalid token" })
        return
    }
};

export default validateToken
