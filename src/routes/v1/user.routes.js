

const express = require('express');
const { PingCheckController, UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');

const userRouter = express.Router();


/**
 * /api/v1/user/ping
 */

userRouter.get('/ping', PingCheckController);


/**
 * /api/v1/user/signup/
 * 
 * POST Request
 * 
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

userRouter.post('/signup',
    UserMiddlewares.validateCreateRequest,
    UserController.createUser
)


module.exports = userRouter;