const { gql } = require('apollo-server-cloud-functions');

const firebaseTypeDef = gql`
    type Watchlist {
        results: [Int]
    }
`;

module.exports = { firebaseTypeDef };
