const { gql } = require('apollo-server-cloud-functions');

const Movies = gql`
    extend type Query {
        movie(id: Int!): Movie
        popularMovies: [Movie]
        upcomingMovies: [Movie]
        nowPlayingMovies: [Movie]
    }

    type Movie {
        id: Int!
        title: String!
        tagline: String
        overview: String
        cast: [Cast]
        crew: [Crew]
        reviews: [Review]
        similar: [Movie]
        genres: [Genre]
        runtime: String
        revenue: String
        releaseDate: String
        shortReleaseDate: String
        votes: String
        voteCount: String
        posterImgUrl: PosterUrl
        backdropImgUrl: BackdropUrl
        videoUrl: String
    }
`;

module.exports = { Movies };
