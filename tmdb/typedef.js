const { gql } = require('apollo-server-cloud-functions');

const tmdbTypeDef = gql`
    type Query {
        movie(id: Int!): Movie
        popularMovies: [Movie]
        upcomingMovies: [Movie]
        nowPlayingMovies: [Movie]
        tv(id: Int!): TV
        popularTvs: [TV]
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

    type TV {
        id: Int!
        name: String!
        overview: String
        cast: [Cast]
        crew: [Crew]
        reviews: [Review]
        similar: [TV]
        genres: [Genre]
        runtime: String
        lastAirDate: String
        shortLastAirDate: String
        totalSeasons: String
        totalEpisodes: String
        votes: String
        voteCount: String
        posterImgUrl: PosterUrl
        backdropImgUrl: BackdropUrl
        videoUrl: String
    }

    type BackdropUrl {
        small: String
        medium: String
        large: String
        original: String
    }

    type Cast {
        castId: Int
        creditId: String!
        id: Int!
        name: String!
        character: String
        profileImgUrl: String
        order: Int
    }

    type Crew {
        creditId: String!
        id: Int!
        name: String!
        department: String
        job: String
        profileImgUrl: String
    }

    type Genre {
        id: Int!
        name: String!
    }

    type PosterUrl {
        tiny: String
        smaller: String
        small: String
        medium: String
        large: String
        larger: String
        original: String
    }

    type Review {
        id: String!
        author: String!
        content: String
        url: String
    }
`;

module.exports = { tmdbTypeDef };
