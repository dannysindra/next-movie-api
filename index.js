const { ApolloServer } = require('apollo-server-cloud-functions');
const functions = require('firebase-functions');

const { config } = require('./config');

const server = new ApolloServer(config);

const handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true
    }
});

exports.handler = functions.https.onRequest(handler);
