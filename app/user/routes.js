const { Router } = require('express');
const userRouter = Router();
const userService = require('./user');
const auth = require('../auth/auth');
const route = require('../../core/config/routename.js')

for (let i = 0; i < route.userRoute.length; i++)
    userRouter.post(`/${route.userRoute[i]}`, userService[route.userRoute[i]]);

for (let i = 0; i < route.authUserRoute.length; i++) {

    userRouter.post(`/${route.authUserRoute[i]}`, auth.verifyToken, userService[route.authUserRoute[i]]);
}
module.exports = userRouter;
