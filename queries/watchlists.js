const { Watchlists } = require('../models');

const watchlists = {
    Query: {
        watchlist: (_, __, context) => Watchlists.getWatchlistByUserId(context)
    },
    Watchlist: {
        results: ({ results }) => results
    }
};

module.exports = { watchlists };
