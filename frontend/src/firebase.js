import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDqOPeToahgpQgTsEB7S3LhvNMfqpIGVeU",
    authDomain: "rota-manuel-lorenzo.firebaseapp.com",
    databaseURL: "https://rota-manuel-lorenzo.firebaseio.com",
    projectId: "rota-manuel-lorenzo",
    storageBucket: "rota-manuel-lorenzo.appspot.com",
    messagingSenderId: "791936952286"
  };
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;