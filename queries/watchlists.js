const { Watchlists } = require('../models');

const watchlists = {
    Query: {
        watchlist: (_, { id }, context) => Watchlists.getWatchlistByUserId(context, id)
    },
    Watchlist: {
        results: ({ results }) => results
    }
};

module.exports = { watchlists };
