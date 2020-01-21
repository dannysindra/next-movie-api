const { Watchlists } = require('../models');

const watchlists = {
    Mutation: {
        addToWatchlist: (_, { id }, context) => Watchlists.addToWatchlist(context, id),
        removeFromWatchlist: (_, { id }, context) => Watchlists.removeFromWatchlist(context, id)
    },
    Watchlist: {
        results: ({ results }) => results
    }
};

module.exports = { watchlists };
