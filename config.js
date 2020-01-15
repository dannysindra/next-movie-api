const { FirebaseConnector } = require('./connectors');
const { TmdbAPI } = require('./datasources');
const { schema } = require('./schema');

const config = {
    schema,
    context: () => {
        return {
            connectors: {
                FirebaseAPI: new FirebaseConnector()
            }
        };
    },
    dataSources: () => ({
        TmdbAPI: new TmdbAPI()
    }),
    playground: true,
    introspection: true
};

module.exports = { config };
