const express = require('express'),
    authController = require('../controllers/authController.js'),
    auth = require('../middleware/auth.js')();

authRouter = express.Router();

authRouter.get('/login', (req, res) => {
    res.json('Login')
})

authRouter.get('/register', auth.authenticate(), (req, res) => {
    res.json('Register')
})

authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)

module.exports = authRouter;
