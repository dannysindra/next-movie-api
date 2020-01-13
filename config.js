const { makeExecutableSchema } = require('apollo-server-cloud-functions');
const merge = require('lodash/merge');
const { firebaseTypeDef, firebaseResolver, FirebaseAPI } = require('./firebase');
const { tmdbTypeDef, tmdbResolver, TmdbAPI } = require('./tmdb');

const typeDefs = [
    firebaseTypeDef,
    tmdbTypeDef
];

const resolvers = merge(
    {},
    firebaseResolver,
    tmdbResolver
);

const dataSources = () => ({
    firebaseAPI: new FirebaseAPI(),
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
