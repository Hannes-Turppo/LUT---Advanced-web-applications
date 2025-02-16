import {body} from 'express-validator';

const userValidators = () => {
    return [
        body("email").escape().trim().isEmail(),
        body("password")
            .escape()
            .isLength({min: 8})
            .matches(/[A-Z]/).withMessage("")
            .matches(/[a-z]/).withMessage("")
            .matches(/[0-9]/).withMessage("")
            .matches(/[#!&?]/).withMessage(""),
        body("username").escape().trim(),
        body("isAdmin").escape().trim()
    ]
};

export {userValidators};
