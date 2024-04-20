const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");
const { UserService } = require('../services');

function validateCreateRequest(req, res, next) {

    if (!req.body.name || !req.body.email || !req.body.password) {

        let details = new Array();

        if (!req.body.name) {
            details.push("name is not found in incomming request in correct form")
        }

        if (!req.body.email) {
            details.push("email is not found in incomming request in correct form")
        }

        if (!req.body.password) {
            details.push("password is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}

function validateLoginRequest(req, res, next) {

    if (!req.body.email || !req.body.password) {

        let details = new Array();

        if (!req.body.email) {
            details.push("email is not found in incomming request in correct form")
        }

        if (!req.body.password) {
            details.push("password is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response;
            next();
        }
    } catch (error) {

        next(error);
    }

}

async function isAdmin(req, res, next) {
    try {
        const response = await UserService.isAdmin(req.user.id);
        if (!response) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Cannot add role.', ['User not authorized for this action'])
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateCreateRequest,
    validateLoginRequest,
    checkAuth,
    isAdmin
};