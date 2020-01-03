import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_APIKEY,
    authDomain: "vt-crc-2020.firebaseapp.com",
    databaseURL: "https://vt-crc-2020.firebaseio.com",
    projectId: "vt-crc-2020",
    storageBucket: "vt-crc-2020.appspot.com",
    messagingSenderId: process.env.NEXT_MESSAGINGSENDERID,
    appId: process.env.NEXT_APPID,
    measurementId: process.env.NEXT_MEASUREMENTID,
  });
}

const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

const auth = async (login = true) => {
  if (login) {
    await firebase.auth().signInWithPopup(provider).then(result => {
      const user = result.user;
      console.log('Signed In', user);
      // TODO: remove all non-essential items
      return user;
    }).catch(error => {
      console.log('Login Error', error);
      return;
    });
  } else {
    await firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    return;
  }
};

const fetchBook = async (userId) => {
  const userRef = await db.collection('users').doc(userId);
  return await userRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return;
      } else {
        const data = doc.data();
        console.log('Document data:', data);
        return data.books;
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
};

export { auth, fetchBook, firebase };