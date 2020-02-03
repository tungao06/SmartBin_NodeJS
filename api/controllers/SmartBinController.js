const express = require("express");
const mongoose = require("mongoose");
const smartbin = require('../models/SmartBinModel');
const app = require('../../app');


var admin = require("firebase-admin");

var serviceAccount = require("../../ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartbin-95f7a.firebaseio.com"
});


let db = admin.firestore();


exports.smartbin_get_all = (req, res, next) => {
var data =[];
  console.log("GET SMARTBIN ALL");
  db.collection("SmartBin").get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
      });
        res.send(data);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

exports.smartbin_get_smartbin = (req, res, next) => {
  console.log("GET SMARTBIN BY ID");
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        res.on(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.send(err);
    });
}

exports.smartbin_create_smartbin = (req, res, next) => {
  console.log("POST SMARTBIN")
  console.log(req.body)
  db.collection('SmartBin').doc().set(req.body);
  res.send(req.body);
}

exports.smartbin_edit_smartbin = (req, res, next) => {
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("PUT SMARTBIN")
      console.log(req.body)
      db.collection('SmartBin').doc(doc.id).update(req.body);
      res.send(req.body);
    });
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.smartbin_delete_smartbin = (req, res, next) => {
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("DELETE SMARTBIN")
      db.collection('SmartBin').doc(doc.id).delete();
      res.send(doc.data());
    });
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
