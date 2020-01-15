const admin = require('firebase-admin');

admin.initializeApp();

class FirebaseConnector {
    constructor() {
        this.firestore = admin.firestore();
    }

    getWatchlistsRef() {
        return this.firestore.collection('watchlists');
    }
}

module.exports = {
    FirebaseConnector
};
