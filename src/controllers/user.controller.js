const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse } = require('../utils/common/');


/**
 * POST Request /api/v1/signup/
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

async function createUser(req, res, next) {

    try {
        const user = await UserService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;
        SuccessResponse.message = "Successfully signed up";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}



module.exports = {
    createUser,
};