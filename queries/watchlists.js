const { Watchlists } = require('../models');

const watchlists = {
    Query: {
        watchlist: (_, __, context) => Watchlists.getWatchlistByUserId(context),
        watchlistEntries: (_, __, context) => Watchlists.getWatchlistEntriesByUserId(context)
    }
};

module.exports = { watchlists };
