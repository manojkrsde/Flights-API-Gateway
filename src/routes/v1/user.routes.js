

const express = require('express');
const { PingCheckController } = require('../../controllers');

const userRouter = express.Router();


/**
 * /api/v1/signup/ping
 */

userRouter.get('/ping', PingCheckController);


module.exports = userRouter;