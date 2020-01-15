const { movieReducer } = require('./utils');

const Movies = {
    getMovieById: async ({dataSources}, id) => {
        const opts = {append_to_response: 'credits,reviews,similar,videos'};
        const result = await dataSources.TmdbAPI.getMovieById(id, opts);
        return movieReducer(result);
    },

    getPopularMovies: async ({dataSources}) => {
        const opts = {region: 'US'};
        const result = await dataSources.TmdbAPI.getPopularMovies(opts);
        return result.results.map(movieReducer); // return just the 1st page
    },

    getUpcomingMovies: async ({dataSources}) => {
        const opts = {region: 'US'};
        const result = await dataSources.TmdbAPI.getUpcomingMovies(opts);
        return result.results.map(movieReducer); // return just the 1st page
    },

    getNowPlayingMovies: async ({dataSources}) => {
        const opts = {region: 'US'};
        const result = await dataSources.TmdbAPI.getNowPlayingMovies(opts);
        return result.results.map(movieReducer); // return just the 1st page
    }
};

module.exports = { Movies };
