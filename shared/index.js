const { gql } = require('apollo-server-cloud-functions');

const rootTypeDef = gql`
    type Query {
        _empty: String
    }
`;

module.exports = { rootTypeDef };
