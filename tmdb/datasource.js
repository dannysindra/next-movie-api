const { RESTDataSource } = require('apollo-datasource-rest');

class TmdbAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.themoviedb.org/3/';
    }

    willSendRequest(request) {
        request.params.append(`api_key`, process.env.TMDB_API_KEY)
    }

    // Movie
    async getMovieById(id) {
        const queryParams = {append_to_response: 'credits,reviews,similar,videos'};
        return await this.get(`movie/${id}`, queryParams);
    }

    async getPopularMovies() {
        const queryParams = {region: 'US'};
        const result = await this.get(`movie/popular`, queryParams);
        return result.results; // return just the 1st page
    }

    async getUpcomingMovies() {
        const queryParams = {region: 'US'};
        const result = await this.get(`movie/upcoming`, queryParams);
        return result.results; // return just the 1st page
    }

    async getNowPlayingMovies() {
        const queryParams = {region: 'US'};
        const result = await this.get(`movie/now_playing`, queryParams);
        return result.results; // return just the 1st page
    }

    // TV
    async getTvById(id) {
        const queryParams = {append_to_response: 'credits,reviews,similar,videos'};
        const result = await this.get(`tv/${id}`, queryParams);
        return result;
    }

    async getPopularTvs() {
        const queryParams = {region: 'US'};
        const result = await this.get(`tv/popular`, queryParams);
        return result.results; // return just the 1st page
    }
}

module.exports = { TmdbAPI };
