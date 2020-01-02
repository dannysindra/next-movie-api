const { makeExecutableSchema } = require('apollo-server-cloud-functions');
const merge = require('lodash/merge');
const { tmdbTypeDef, tmdbResolver, TmdbAPI } = require('./tmdb');

const typeDefs = [
    tmdbTypeDef
];

const resolvers = merge(
    {},
    tmdbResolver
);

const dataSources = () => ({
    tmdbAPI: new TmdbAPI()
});

const config = {
    schema: makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    dataSources,
    playground: true,
    introspection: true
};

module.exports = { config };
