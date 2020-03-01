const { gql } = require('apollo-server-cloud-functions');

const Tvs = gql`
    extend type Query {
        tv(id: Int!): TV
        popularTvs: [TV]
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
`;

module.exports = { Tvs };
