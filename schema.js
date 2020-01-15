const { makeExecutableSchema } = require('apollo-server-cloud-functions');
const merge = require('lodash/merge');
const { typeDefs } = require('./typedefs');
const { queries } = require('./queries');

const resolvers = merge(
    {},
    queries,
    // mutations,
    // subscriptions
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = { schema };
