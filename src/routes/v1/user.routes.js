

const express = require('express');
const { PingCheckController, UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');

const userRouter = express.Router();


/**
 * /api/v1/user/ping
 */

userRouter.get('/ping', PingCheckController);


/**
 * /api/v1/user/info
 */

userRouter.get('/info',
    UserMiddlewares.checkAuth
    , PingCheckController);



/**
 * /api/v1/user/register/
 * 
 * POST Request
 * 
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

userRouter.post(
    '/register',
    UserMiddlewares.validateCreateRequest,
    UserController.register
)


/**
 * /api/v1/user/login/
 * 
 * POST Request
 * 
 * Request Body -> {email:"a@b.com",password:'123455'}
 */

userRouter.post('/login',
    UserMiddlewares.validateLoginRequest,
    UserController.login
)


/**
 * /api/v1/user/login/
 * 
 * POST Request
 * 
 * Request Body -> {email:"a@b.com",password:'123455'}
 */

userRouter.post('/role',
    UserMiddlewares.checkAuth,
    UserMiddlewares.isAdmin,
    UserController.addRoleToUser
)

module.exports = userRouter;