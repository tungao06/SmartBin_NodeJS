const express = require("express");
const mongoose = require("mongoose");
const Location = require('../models/LocationModel');
const db = require('../../Setting');


exports.Location_get_all = (req, res, next) => {
  var data = [];
  console.log("GET Location ALL");
  db.collection("Location").orderBy('_id').get()
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

exports.Location_get_Location = (req, res, next) => {
  console.log("GET Location BY ID");
  console.log(req.params._id);
  db.collection("Location").where('_id', '==', req.params._id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return next();
      } else {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          res.send(doc.data());
        });
        console.log("finish");
      }

    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.send(err);
    });
}

exports.Location_create_Location = (req, res, next) => {
  console.log("POST Location")
  //console.log(req.body)
  var data = JSON.parse(JSON.stringify(Location(req.body)));
  console.log(data)
  db.collection('Location').doc().set(data);
  res.send(data);
}

exports.Location_edit_Location = (req, res, next) => {
  db.collection("Location").where('Ids', '==', req.params.Ids).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return next();
      } else {
        snapshot.forEach((doc) => {
          console.log("PUT Location")
          //console.log(req.body)
          var data = JSON.parse(JSON.stringify(Location(req.body)));
          console.log(data)
          db.collection('Location').doc(doc.id).update(data)
          res.send(data);
        });
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.Location_delete_Location = (req, res, next) => {
  db.collection("Location").where('Ids', '==', req.params.Ids).get()
    .then((snapshot) => {

      if (snapshot.empty) {
        console.log('No matching documents.');
        return next();
      } else {
        snapshot.forEach((doc) => {
          console.log("DELETE Location")
          db.collection('Location').doc(doc.id).delete();
          res.send(doc.data());
        });
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
