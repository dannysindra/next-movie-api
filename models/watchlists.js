const Watchlists = {
    getWatchlistByUserId: async ({ connectors }, userId) => {
        const watchlistDoc = await connectors.FirebaseAPI.getWatchlistsRef()
            .doc(userId)
            .get();

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
    Watchlists
};
