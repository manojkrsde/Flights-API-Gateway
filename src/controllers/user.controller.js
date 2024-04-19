const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse } = require('../utils/common/');



/**
 * POST Request /api/v1/user/register/
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

async function register(req, res, next) {

    try {
        const user = await UserService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;
        SuccessResponse.message = "Successfully created account";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

/**
 * POST Request /api/v1/user/login/
 * Request Body -> {email:"a@b.com",password:'123455'}
 */

async function login(req, res, next) {

    try {
        const response = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully signed in";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

/**
 * POST Request /api/v1/user/role/
 * Request Body -> {id:1,role:'admin'}
 */

async function addRoleToUser(req, res, next) {
    try {
        const user = await UserService.addRoleToUser({
            role: req.body.role,
            id: req.body.id
        });

        SuccessResponse.data = user;
        SuccessResponse.message = "Added role successfully";
        SuccessResponse.statusCode = StatusCodes.OK;
        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    addRoleToUser
};