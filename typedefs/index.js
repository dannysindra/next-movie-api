const { gql } = require('apollo-server-cloud-functions');

const { common } = require('./common');
const { Movies } = require('./movies');
const { Tvs } = require('./tvs');
const { Watchlists } = require('./watchlists');

const Root = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const typeDefs = [
    Root,
    common,
    Movies,
    Tvs,
    Watchlists
];

module.exports = { typeDefs };
