const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/UserModel');
const db = require('../../Setting');

exports.User_get_all = (req, res, next) => {
var data = [];
  console.log("GET User ALL");
  db.collection("User").get()
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

exports.User_get_User = (req, res, next) => {
  console.log("GET User BY ID");
  var data = [];
  db.collection("User").where('Ids', '==', req.params.Ids).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
      });
        res.send(data);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.send(err);
    });
}

exports.User_create_User = (req, res, next) => {
  console.log("POST User")
  //console.log(req.body);
  var data = JSON.parse(JSON.stringify(User(req.body)));
  console.log(data)
  db.collection('User').doc().set(data);
  res.send(data);
}

exports.User_edit_User = (req, res, next) => {
  db.collection("User").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("PUT User")
      //console.log(req.body);
      var data = JSON.parse(JSON.stringify(User(req.body)));
      console.log(data)
      db.collection('User').doc(doc.id).update(data);
    });
      res.send(data);
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.User_delete_User = (req, res, next) => {
  db.collection("User").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("DELETE User")
      db.collection('User').doc(doc.id).delete();
      res.send(doc.data());
    });
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
