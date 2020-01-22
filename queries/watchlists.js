const { Watchlists } = require('../models');

const watchlists = {
    Query: {
        watchlist: (_, __, context) => Watchlists.getWatchlistByUserId(context)
    }
};

module.exports = { watchlists };
