const Watchlists = {
    getWatchlistByUserId: async ({ connectors, req }) => {
        let uid;

        try {
            uid = await connectors.FirebaseAPI.getUid(req);
        }
        catch (error) {
            console.log('Error verifying user', error);
            return;
        }

        const watchlistDoc = await connectors.FirebaseAPI.getWatchlistsRef()
            .doc(uid)
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
