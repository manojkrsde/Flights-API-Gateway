const { UserRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');


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




module.exports = {
    createUser
};