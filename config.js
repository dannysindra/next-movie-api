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

// https://blog.apollographql.com/layering-graphql-on-top-of-rest-569c915083ad
// https://github.com/apollographql/apollo-server/issues/1247
// https://github.com/Saeris/mini-movie-db
// https://github.com/Saeris/mini-movie-db-api
// https://medium.com/@piuccio/running-apollo-server-on-firebase-cloud-functions-265849e9f5b8
const config = {
    schema: makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    dataSources,
    playground: true,
    inspection: true
};

module.exports = { config };
