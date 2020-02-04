

var admin = require("firebase-admin");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartbin-demo-58f9d.firebaseio.com"
});


let db = admin.firestore();

module.exports = db;