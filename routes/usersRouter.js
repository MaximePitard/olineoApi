const express = require('express');
const users = require("../controllers/usersController.js");

usersRouter = express.Router();

usersRouter.route('/').get(users.getUsers);

module.exports = usersRouter;
