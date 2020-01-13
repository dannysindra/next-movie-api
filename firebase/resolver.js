const { Watchlist } = require('./models');

const firebaseResolver = {
    Query: {
        watchlist: async (_, { id }, context) => await Watchlist.getWatchlistByUserId(id, context)
    },
    Watchlist: {
        results: ({ results }) => results
    }
};

module.exports = { firebaseResolver };
