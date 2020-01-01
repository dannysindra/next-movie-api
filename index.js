const { ApolloServer } = require('apollo-server-cloud-functions');
const { config } = require('./config');

const server = new ApolloServer(config);
const handler = server.createHandler();

module.exports = {
    handler: server.createHandler()
};
