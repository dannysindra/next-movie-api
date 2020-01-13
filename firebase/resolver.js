const firebaseResolver = {
    Query: {
        watchlist: (_, { id }, { dataSources }) => dataSources.firebaseAPI.getWatchlistByUserId(id)
    }
};

module.exports = { firebaseResolver };
