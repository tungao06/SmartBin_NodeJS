const express = require("express");
const mongoose = require("mongoose");
const Bin = require('../models/BinModel');
const db = require('../../Setting');


exports.Bin_get_all = (req, res, next) => {
  var data = [];
  console.log("GET Bin ALL");
  db.collection("Bin").orderBy('_id').get()
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

exports.Bin_get_Bin = (req, res, next) => {
  console.log("GET Bin BY ID");
  db.collection("Bin").where('Ids', '==', req.params.Ids).orderBy('_id').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
        res.send(doc.data());
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.send(err);
    });
}

exports.Bin_create_Bin = (req, res, next) => {
  console.log("POST Bin")
  //console.log(req.body)
  var data = JSON.parse(JSON.stringify(Bin(req.body)));
  console.log(data)
  db.collection('Bin').doc().set(data);
  res.send(data);
}

exports.Bin_edit_Bin = (req, res, next) => {
  db.collection("Bin").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("PUT Bin")
      //console.log(req.body)
      var data = JSON.parse(JSON.stringify(Bin(req.body)));
      console.log(data)
      db.collection('Bin').doc(doc.id).update(data)
    });
    res.send(data);
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.Bin_delete_Bin = (req, res, next) => {
  db.collection("Bin").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("DELETE Bin")
      db.collection('Bin').doc(doc.id).delete();
      res.send(doc.data());
    });
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
