const { COLLECTION_WATCHLISTS } = require('./connector');

const Watchlist = {
    getWatchlistByUserId: async (userId, context) => {
        const watchlistDoc = await context.firebase.collection(COLLECTION_WATCHLISTS).doc(userId).get();
        let data;

        try {
            data = watchlistDoc.exists ? watchlistDoc.data() : {results: []};
        }
        catch (error) {
            console.log('Error getting document:', error);
            return;
        }

        return data;
    }
};

module.exports = {
    Watchlist
};
