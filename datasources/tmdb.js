const { RESTDataSource } = require('apollo-datasource-rest');
const functions = require('firebase-functions');

const API_KEY = functions.config().tmdb ? functions.config().tmdb.key : process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

class TmdbAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    willSendRequest(request) {
        request.params.append(`api_key`, API_KEY)
    }

    // Movie
    async getMovieById(id, opts = {}) {
        return await this.get(`movie/${id}`, opts);
    }

    async getPopularMovies(opts = {}) {
        return await this.get(`movie/popular`, opts);
    }

    async getUpcomingMovies(opts = {}) {
        return await this.get(`movie/upcoming`, opts);
    }

    async getNowPlayingMovies(opts = {}) {
        return await this.get(`movie/now_playing`, opts);
    }

    // TV
    async getTvById(id, opts = {}) {
        return await this.get(`tv/${id}`, opts);
    }

    async getPopularTvs(opts = {}) {
        return await this.get(`tv/popular`, opts);
    }
}

module.exports = { TmdbAPI };
