const { gql } = require('apollo-server-cloud-functions');

const Watchlists = gql`
    extend type Query {
        watchlist: Watchlist!
        watchlistEntries: WatchlistEntries!
    }

    extend type Mutation {
        addToWatchlist(id: Int!): Watchlist!
        removeFromWatchlist(id: Int!): Watchlist!
    }

    type Watchlist {
        id: String!
        results: [Int]
    }

    type WatchlistEntries {
        id: String!
        results: [Movie]
    }
`;

module.exports = { Watchlists };
