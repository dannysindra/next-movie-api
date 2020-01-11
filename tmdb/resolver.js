const tmdbResolver = {
    Query: {
        movie: (_, { id }, { dataSources }) => dataSources.tmdbAPI.getMovieById(id),
        popularMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getPopularMovies(),
        upcomingMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getUpcomingMovies(),
        nowPlayingMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getNowPlayingMovies(),
        tv: (_, { id }, { dataSources }) => dataSources.tmdbAPI.getTvById(id),
        popularTvs: (_, __, { dataSources }) => dataSources.tmdbAPI.getPopularTvs()
    }
};

module.exports = { tmdbResolver };
