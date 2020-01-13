const admin = require('firebase-admin');

admin.initializeApp();

class FirebaseAPI {
    constructor(admin) {
        super();
        this.watchlistsRef = admin.firestore().collection('watchlists');
    }

    async getWatchlistByUserId(id) {
        const watchlistDoc = await this.watchlistsRef.doc(id).get();
        let data;

        try {
            data = watchlistDoc.exists ? watchlistDoc.data() : {results: []};
        }
        catch (error) {
            console.log('Error getting document:', error);
            return;
        }

        return data.results;
    }
}

module.exports = { FirebaseAPI };
