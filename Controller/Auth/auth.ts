import express from "express"
const router = express.Router()
import * as service from './services'
import { body } from "express-validator"

//ROUTE 1: API Endpoint for new User Registration. No Login Required.
router.post('/signup',
    [
        body('email').isEmail().withMessage("Enter Valid Email Address."),
        body('password').isLength({min: 8}).withMessage("Minimum 8 characters Password")
    ],
    service.signup
)

//ROUTE 2: API Endpoint for existing users to login. No Login Required.
router.post('/login',
    [
        body('email').isEmail().withMessage("Enter Valid Email Address.")
    ],
    service.login
)

//ROUTE 3: Logout Endpoint.
router.get('/logout',
    service.logout
)

//ROUTE 4: Automatic Login.
router.get('/autoLogin',
    service.autoLogin
)

export { router };
