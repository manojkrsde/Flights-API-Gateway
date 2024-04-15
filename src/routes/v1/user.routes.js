

const express = require('express');
const { PingCheckController, UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');

const userRouter = express.Router();


/**
 * /api/v1/signup/ping
 */

userRouter.get('/ping', PingCheckController);


/**
 * /api/v1/signup/
 * 
 * POST Request
 * 
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

userRouter.post('/',
    UserMiddlewares.validateCreateRequest,
    UserController.createUser
)


module.exports = userRouter;