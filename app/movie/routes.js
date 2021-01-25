const { Router } = require('express');
const movieRouter = Router();
const movieService = require('./movie');
// const auth = require('../auth/auth');
const route = require('../../core/config/routename.js')

for (let i = 0; i < route.movieRoute.length; i++)
    movieRouter.post(`/${route.movieRoute[i]}`, movieService[route.movieRoute[i]]);

// for (let i = 0; i < route.authmovieRoute.length; i++) {

//     movieRouter.post(`/${route.authmovieRoute[i]}`, auth.verifyToken, movieService[route.authMovieRoute[i]]);
// }
module.exports = movieRouter;
