const express = require("express");
const mongoose = require("mongoose");
const SmartBin = require('../models/SmartBinModel');
const db = require('../../Setting');


exports.SmartBin_get_all = (req, res, next) => {
  var data = [];
  console.log("GET SmartBin ALL");

  db.collection("SmartBin").orderBy('_id').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
      });
      res.json(data);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

exports.SmartBin_get_SmartBin = (req, res, next) => {
  console.log("GET SmartBin BY ID");
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get()
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

exports.SmartBin_create_SmartBin = (req, res, next) => {
  console.log("POST SmartBin")
  //console.log(req.body);
  var data = JSON.parse(JSON.stringify(new SmartBin(req.body)));
  console.log(data)
  db.collection('SmartBin').doc().set(data);
  res.send(data);
}

exports.SmartBin_edit_SmartBin = (req, res, next) => {
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return next();
    } else {
      snapshot.forEach((doc) => {
        console.log("PUT SmartBin")
        //console.log(req.body);
        var data = JSON.parse(JSON.stringify(SmartBin(req.body)));
        console.log(data)
        db.collection('SmartBin').doc(doc.id).update(data)
        res.send(data);
      });
    }
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.SmartBin_delete_SmartBin = (req, res, next) => {
  db.collection("SmartBin").where('Ids', '==', req.params.Ids).get()
    .then((snapshot) => {

      if (snapshot.empty) {
        console.log('No matching documents.');
        return next();
      } else {
        snapshot.forEach((doc) => {
          console.log("DELETE SmartBin")
          db.collection('SmartBin').doc(doc.id).delete();
          res.send(doc.data());
        });
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
