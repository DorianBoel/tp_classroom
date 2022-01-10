import firebase from '../firebase';

const db = firebase.ref("/stagiaires");

class StagiaireDataService {
    getAll() {
        return db;
    }
    create(stagiaire) {
        return db.push(stagiaire);
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

export default new StagiaireDataService();
