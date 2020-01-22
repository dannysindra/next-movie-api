const { gql } = require('apollo-server-cloud-functions');

const Watchlists = gql`
    extend type Query {
        watchlist: Watchlist!
    }

    extend type Mutation {
        addToWatchlist(id: Int!): Watchlist!
        removeFromWatchlist(id: Int!): Watchlist!
    }

    type Watchlist {
        id: String!
        results: [Int]
    }
`;

module.exports = { Watchlists };
