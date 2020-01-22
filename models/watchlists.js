const firebase = require('firebase-admin');

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
    addToWatchlist: async ({ connectors: { FirebaseAPI }, req }, entityId) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            throw new Error('Error verifying user');
        }
        
        // Write to the user's watchlist
        try {
            await FirebaseAPI.getWatchlistsRef().doc(uid).update({
                id: uid,
                results: firebase.firestore.FieldValue.arrayUnion(entityId)
            });
        }
        catch (error) {
            throw new Error('Error adding to watchlist');
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

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

        // Write to the user's watchlist
        try {
            await FirebaseAPI.getWatchlistsRef().doc(uid).update({
                id: uid,
                results: firebase.firestore.FieldValue.arrayRemove(entityId)
            });
        }
        catch (error) {
            throw new Error('Error writing to document');
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

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
