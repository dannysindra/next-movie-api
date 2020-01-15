const { Movies } = require('../models');

const movies = {
    Query: {
        movie: (_, { id }, context) => Movies.getMovieById(context, id),
        popularMovies: (_, __, context) => Movies.getPopularMovies(context),
        upcomingMovies: (_, __, context) => Movies.getUpcomingMovies(context),
        nowPlayingMovies: (_, __, context) => Movies.getNowPlayingMovies(context)
    }
};

module.exports = { movies };
