const { gql } = require('apollo-server-cloud-functions');

const Watchlists = gql`
    extend type Query {
        watchlist: Watchlist
    }

    type Watchlist {
        results: [Int]
    }
`;

module.exports = { Watchlists };
