const COLLECTION_WATCHLISTS = 'watchlists';

class FirebaseConnector {
    constructor(admin) {
        this.firestore = admin.firestore();
    }

    collection(name) {
        return this.firestore.collection(name);
    }
}

module.exports = {
    COLLECTION_WATCHLISTS,
    FirebaseConnector
};
