const { gql } = require('apollo-server-cloud-functions');

const common = gql`
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

    "Might only be exclusive for Movie"
    type Review {
        id: String!
        author: String!
        content: String
        url: String
    }
`;

module.exports = { common };
