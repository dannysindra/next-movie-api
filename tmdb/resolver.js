const utils = require('./utils');

const tmdbResolver = {
    Query: {
        movie: (_, { id }, { dataSources }) => dataSources.tmdbAPI.getMovieById(id),
        popularMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getPopularMovies(),
        upcomingMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getUpcomingMovies(),
        nowPlayingMovies: (_, __, { dataSources }) => dataSources.tmdbAPI.getNowPlayingMovies(),
        tv: (_, { id }, { dataSources }) => dataSources.tmdbAPI.getTvById(id),
        popularTvs: (_, __, { dataSources }) => dataSources.tmdbAPI.getPopularTvs()
    },
    Movie: {
        cast: ({ credits }) => utils.toFeaturedCast(credits),
        crew: ({ credits }) => utils.toFeaturedCrew(credits),
        reviews: ({ reviews }) => utils.toReviews(reviews),
        similar: ({ similar }) => utils.toSimilar(similar),
        genres: ({ genres }) => utils.toGenres(genres),
        runtime: ({ runtime }) => utils.toRuntime(runtime),
        revenue: ({ revenue }) => utils.toRevenue(revenue),
        releaseDate: ({ release_date }) => utils.toLocaleDate(release_date),
        shortReleaseDate: ({ release_date }) => utils.toLocaleShortDate(release_date),
        votes: ({ vote_average }) => utils.toVote(vote_average),
        voteCount: ({ vote_count }) => utils.toVoteCount(vote_count),
        posterImgUrl: ({ poster_path }) => utils.toPosterImgUrl(poster_path),
        backdropImgUrl: ({ backdrop_path }) => utils.toBackdropImgUrl(backdrop_path),
        videoUrl: ({ videos }) => utils.toVideoUrl(videos)
    },
    TV: {
        cast: ({ credits }) => utils.toFeaturedCast(credits),
        crew: ({ credits }) => utils.toFeaturedCrew(credits),
        reviews: ({ reviews }) => utils.toReviews(reviews),
        similar: ({ similar }) => utils.toSimilar(similar),
        genres: ({ genres }) => utils.toGenres(genres),
        runtime: ({ episode_run_time }) => utils.toRuntime(episode_run_time),
        lastAirDate: ({ last_air_date }) => utils.toLocaleDate(last_air_date),
        shortLastAirDate: ({ last_air_date }) => utils.toLocaleShortDate(last_air_date),
        totalSeasons: ({ number_of_seasons }) => utils.toTotalSeasons(number_of_seasons),
        totalEpisodes: ({ number_of_episodes }) => utils.toTotalEpisodes(number_of_episodes),
        votes: ({ vote_average }) => utils.toVote(vote_average),
        voteCount: ({ vote_count }) => utils.toVoteCount(vote_count),
        posterImgUrl: ({ poster_path }) => utils.toPosterImgUrl(poster_path),
        backdropImgUrl: ({ backdrop_path }) => utils.toBackdropImgUrl(backdrop_path),
        videoUrl: ({ videos }) => utils.toVideoUrl(videos)
    }
};

module.exports = { tmdbResolver };
