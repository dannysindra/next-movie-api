const { gql } = require('apollo-server-cloud-functions');

const Watchlists = gql`
    extend type Query {
        watchlist: Watchlist
    }

    extend type Mutation {
        addToWatchlist(id: Int!): WatchlistUpdateResponse!
        removeFromWatchlist(id: Int!): WatchlistUpdateResponse!
    }

    type Watchlist {
        results: [Int]
    }

    type WatchlistUpdateResponse {
        success: Boolean!
        message: String
        results: [Int]
    }
`;

module.exports = { Watchlists };
