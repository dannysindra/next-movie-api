const firebase = require('firebase-admin');

const Watchlists = {
    getWatchlistByUserId: async ({ connectors: { FirebaseAPI }, req }) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            console.log('Error verifying user', error);
            return;
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

            return watchlistDoc.exists ? watchlistDoc.data() : {results: []};
        }
        catch (error) {
            console.log('Error getting document:', error);
            return;
        }
    },
    addToWatchlist: async ({ connectors: { FirebaseAPI }, req }, entityId) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            console.log('Error verifying user', error);

            return {
                success: false,
                message: 'Error verifying user'
            };
        }
        
        // Write to the user's watchlist
        try {
            await FirebaseAPI.getWatchlistsRef().doc(uid).update({
                uid,
                results: firebase.firestore.FieldValue.arrayUnion(entityId)
            });
        }
        catch (error) {
            console.log('Error writing to document:', error);

            return {
                success: false,
                message: 'Error adding to watchlist'
            };
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

            if (!watchlistDoc.exists) {
                return Promise.reject('Error retrieving updated watchlist');
            }
            
            const res = watchlistDoc.exists ? watchlistDoc.data() : {results: []};

            return {
                success: true,
                message: 'successfully added to watchlist',
                results: res.results
            };
        }
        catch (error) {
            console.log('Error retrieving updated watchlist:', error);

            return {
                success: false,
                message: 'Error retrieving updated watchlist'
            };
        }
    },
    removeFromWatchlist: async ({ connectors: { FirebaseAPI }, req }, entityId) => {
        // Get current user ID
        let uid;

        try {
            uid = await FirebaseAPI.getUid(req);
        }
        catch (error) {
            console.log('Error verifying user', error);

            return {
                success: false,
                message: 'Error verifying user'
            };
        }

        // Write to the user's watchlist
        try {
            await FirebaseAPI.getWatchlistsRef().doc(uid).update({
                uid,
                results: firebase.firestore.FieldValue.arrayRemove(entityId)
            });
        }
        catch (error) {
            console.log('Error writing to document:', error);

            return {
                success: false,
                message: 'Error writing to document'
            };
        }

        // Read the user's watchlist
        try {
            const watchlistDoc = await FirebaseAPI.getWatchlistsRef()
                .doc(uid)
                .get();

            if (!watchlistDoc.exists) {
                return Promise.reject('Error retrieving updated watchlist');
            }
            
            const res = watchlistDoc.exists ? watchlistDoc.data() : {results: []};

            return {
                success: true,
                message: 'successfully removed from watchlist',
                results: res.results
            };
        }
        catch (error) {
            console.log('Error retrieving updated watchlist:', error);

            return {
                success: false,
                message: 'Error retrieving updated watchlist'
            };
        }
    }
};

module.exports = {
    Watchlists
};
