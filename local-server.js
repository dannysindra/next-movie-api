const { ApolloServer } = require('apollo-server');
const { config } = require('./config');

const server = new ApolloServer(config);

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
