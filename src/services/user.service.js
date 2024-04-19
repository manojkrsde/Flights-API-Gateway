const { UserRepository, UserRoleRepository, RoleRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { Auth, Enums } = require('../utils/common/');



const userRepository = new UserRepository();
const userRoleRepository = new UserRoleRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {

    try {

        const user = await userRepository.create(data);

        const role = await roleRepository.getRoleByName(Enums.USER_ROLES.CUSTOMER);

        /**
         * creating user role object, in users table we need user_id and role_id
         */
        const user_role = {
            user_id: user.id,
            role_id: role.id
        }

        /**
         * Updating user role
         */
        await userRoleRepository.create(user_role);


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

async function isAuthenticated(token) {

    try {

        if (!token) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Missing JWT token']);
        }

        const response = Auth.verifyToken(token);

        const user = await userRepository.get(response.id);

        if (!user) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['No user found']);
        }

        return user.id;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error.name == 'JsonWebTokenError') {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Invalid JWT token']);
        }

        if (error.name == 'TokenExpiredError') {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['JWT token expired']);
        }

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

        }

        Logger.error({ message: "Something went wrong while authenticating", error: error });
        throw new InternalServerError("Authentication failed");
    }
}


async function addRoleToUser(data) {

    try {

        const user = await userRepository.get(data.id);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Cannot add role', [`No user found for the given id : ${data.id}`]);
        }
        console.log("Called");

        const role = await roleRepository.getRoleByName(data.role);

        if (!role) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the given role : ${data.role}`]);
        }

        /**
         * creating user role object, in users table we need user_id and role_id
         */
        const user_role = {
            user_id: user.id,
            role_id: role.id
        }

        /**
         * If user already has the role
         */
        const alreadyHasRole = await userRoleRepository.getUserRole(user.id, role.id);

        if (alreadyHasRole) {
            throw new AppError(StatusCodes.BAD_REQUEST, `Role already associated`, [`User is already ${role.name}`]);
        }

        return await userRoleRepository.create(user_role);

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

        Logger.error({ message: "Something went wrong while adding role to user", error: error });
        throw new InternalServerError("Cannot add role to user");
    }
}

async function isAdmin(id) {

    try {

        console.log("Called isAdmin Service")

        const user = await userRepository.get(id);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [`No user found for the given id : ${id}`]);
        }

        const adminRole = await roleRepository.getRoleByName(Enums.USER_ROLES.ADMIN);

        if (!adminRole) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the admin `]);
        }

        /**
         * Updating user role
         */
        const userRole = await userRoleRepository.getUserRole(user.id, adminRole.id);

        if (!userRole) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authorized', [`User is not authorized to perform this action, admin privilages required`]);
        }

        return userRole.user_id === user.id;

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

        Logger.error({ message: "Something went wrong while adding role to user", error: error });
        throw new InternalServerError("No user found");
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin
};