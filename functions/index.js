const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.createUserRecord = functions.auth.user().onCreate(user => {
  const data = {
    banned: false,
    books: {},
    created: admin.firestore.FieldValue.serverTimestamp(),
  };
  return db
    .collection("users")
    .doc(user.uid)
    .set(data, { merge: true });
});

// exports.editUserBook = functions.https.onRequest(async (req, res) => {
//   db
//     .collection("users")
//     .doc(req.user/books)
//     .update();
//   return true;
// });