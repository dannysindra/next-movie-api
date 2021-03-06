const { Watchlists } = require('../models');

const watchlists = {
    Mutation: {
        addToWatchlist: (_, { id }, context) => Watchlists.addToWatchlist(context, id),
        removeFromWatchlist: (_, { id }, context) => Watchlists.removeFromWatchlist(context, id)
    }
};

module.exports = { watchlists };
