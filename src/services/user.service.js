const { UserRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { Auth } = require('../utils/common/');



let userRepository = new UserRepository();

async function createUser(data) {

    try {

        const user = await userRepository.create(data);
        return user;
    } catch (error) {

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

        }

        throw new InternalServerError("Cannot create a new User Object");

    }
}

async function signIn(data) {

    try {

        /**
         * Step 1: Check if user is present or not
         * Step 2: Match Password
         * Step 3: Generate JWT Token
         */
        const user = await userRepository.getUserByEmail(data.email);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Unable to sing in', ['No user found for the given email.']);
        }

        const matchPassword = Auth.checkPassword(data.password, user.password);

        if (!matchPassword) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Unable to sing in', ['Incorrect Password']);
        }

        const jwt = Auth.generateToken({ id: user.id, email: user.email });

        return jwt;


    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

        }

        Logger.error({ message: "Something went wrong while singin", error: error });
        throw new InternalServerError("Cannot sign in ...");
    }
}



module.exports = {
    createUser,
    signIn
};