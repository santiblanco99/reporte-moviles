const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.getBugs = functions.https.onRequest(async (req, res) => {
    const snapshot = await admin.firestore().collection('bugs').get();
    // res.status(200).send(snapshot.docs);
    res.status(200).json({
        docs: snapshot
    })
  });