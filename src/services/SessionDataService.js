import firebase from '../firebase';

const db = firebase.ref("/sessions");

class SessionDataService {
    getAll() {
        return db;
    }
    create(session) {
        return db.push(session);
    }
    update(key, value) {
        return db.child(key).update(value);
    }
    delete(key) {
        return db.child(key).remove();
    }
    deleteAll() {
        return db.remove();
    }
}

export default new SessionDataService();
