const firebase = require('firebase-admin');
const { movieReducer } = require('./utils');

const Watchlists = {
    getWatchlistByUserId: async ({ connectors: { FirebaseAPI }, req }) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            throw new Error('Error verifying user');
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

            return watchlistDoc.exists ? watchlistDoc.data() : {id: uid, results: []};
        }
        catch (error) {
            throw new Error('Error getting document');
        }
    },

    getWatchlistEntriesByUserId: async ({ connectors, dataSources, req }) => {
        // Get current user ID
        let uid;

        try {
            uid = await connectors.FirebaseAPI.getUid(req);
        }
        catch (error) {
            throw new Error('Error verifying user');
        }

        // Read the watchlist IDs
        let ids;

        try {
            const watchlistDoc = await connectors.FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

            ids = watchlistDoc.exists ? watchlistDoc.data().results : [];
        }
        catch (error) {
            throw new Error('Error getting watchlist IDs');
        }

        // Get the watchlist entries
        try {
            const promises = ids.map((id) => dataSources.TmdbAPI.getMovieById(id));
            const resolved = await Promise.all(promises);

            return {
                id: uid,
                results: resolved.map(raw => movieReducer(raw))
            };
        }
        catch (error) {
            throw new Error('Error getting watchlist entries');
        }
    },

    addToWatchlist: async ({ connectors: { FirebaseAPI }, req }, entityId) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            throw new Error('Error verifying user');
        }

        const docRef = FirebaseAPI.getWatchlistsRef().doc(uid);
        
        // Write to the user's watchlist
        try {
            const watchlistDoc = await docRef.get();

            if (watchlistDoc.exists) {
                await docRef.update({
                    id: uid,
                    results: firebase.firestore.FieldValue.arrayUnion(entityId)
                });
            }
            else {
                await docRef.set({
                    id: uid,
                    results: firebase.firestore.FieldValue.arrayUnion(entityId)
                });
            }
        }
        catch (error) {
            throw new Error('Error adding to watchlist');
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await docRef.get();

            if (!watchlistDoc.exists) {
                return Promise.reject('Error retrieving updated watchlist');
            }
            
            return watchlistDoc.exists ? watchlistDoc.data() : {id: uid, results: []};
        }
        catch (error) {
            throw new Error('Error retrieving updated watchlist');
        }
    },

    removeFromWatchlist: async ({ connectors: { FirebaseAPI }, req }, entityId) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            throw new Error('Error verifying user');
        }

        const docRef = FirebaseAPI.getWatchlistsRef().doc(uid);

        // Write to the user's watchlist
        try {
            const watchlistDoc = await docRef.get();

            if (watchlistDoc.exists) {
                await docRef.update({
                    id: uid,
                    results: firebase.firestore.FieldValue.arrayRemove(entityId)
                });
            }
        }
        catch (error) {
            throw new Error('Error writing to document');
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await docRef.get();

            if (!watchlistDoc.exists) {
                return Promise.reject('Error retrieving updated watchlist');
            }
            
            return watchlistDoc.exists ? watchlistDoc.data() : {id: uid, results: []};
        }
        catch (error) {
            throw new Error('Error retrieving updated watchlist');
        }
    }
};

module.exports = {
    Watchlists
};
