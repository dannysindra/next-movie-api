const admin = require('firebase-admin');

admin.initializeApp();

class FirebaseConnector {
    constructor() {
        this.firestore = admin.firestore();
        this.auth = admin.auth();
    }

    async getUid(req) {
        const rawToken = (req.headers && req.headers.authorization)
            ? req.headers.authorization
            : null;

        if (!rawToken) {
            console.log('No token found');
            return;
        }

        const token = rawToken.replace('Bearer ', '');
        let res;
        
        try {
            res = await this.auth.verifyIdToken(token);
        }
        catch (error) {
            console.log('UID verification failed', error);
            return;
        }

        return res.uid;
    }

    getWatchlistsRef() {
        return this.firestore.collection('watchlists');
    }
}

module.exports = {
    FirebaseConnector
};
