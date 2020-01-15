const { gql } = require('apollo-server-cloud-functions');

const Watchlists = gql`
    extend type Query {
        watchlist(id: String!): Watchlist
    }

    type Watchlist {
        results: [Int]
    }
`;

module.exports = { Watchlists };
