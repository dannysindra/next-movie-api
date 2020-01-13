const { makeExecutableSchema } = require('apollo-server-cloud-functions');
const admin = require('firebase-admin');
const merge = require('lodash/merge');

const { firebaseTypeDef, firebaseResolver, FirebaseConnector } = require('./firebase/index');
const { rootTypeDef } = require('./shared');
const { tmdbTypeDef, tmdbResolver, TmdbAPI } = require('./tmdb');

admin.initializeApp();

const typeDefs = [
    rootTypeDef,
    firebaseTypeDef,
    tmdbTypeDef
];

const resolvers = merge(
    {},
    firebaseResolver,
    tmdbResolver
);

const dataSources = () => ({
    tmdbAPI: new TmdbAPI()
});

const context = () => ({
    firebase: new FirebaseConnector(admin)
});

const config = {
    schema: makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    dataSources,
    context,
    playground: true,
    introspection: true
};

module.exports = { config };
