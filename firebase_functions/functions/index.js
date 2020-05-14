const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var serviceAccount = require("./data/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reporte-moviles.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.getBugs = functions.https.onRequest(async (req, res) => {
    admin.storage
    const promise = admin.firestore().collection('bugs').listDocuments();
    promise.then(documentRefs => {
        return admin.firestore().getAll(documentRefs);
    }).then(snapshots => {
        res.send(snapshots.map(doc => doc.data()));
    }).catch(e => {
            console.error(e);
            res.status(500).send(e);
            return;
        })
    // res.status(200).send(snapshot.docs);
    // res.status(200).json({
    //     docs: snapshot
    // })
});