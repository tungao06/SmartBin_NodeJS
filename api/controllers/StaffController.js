const express = require("express");
const mongoose = require("mongoose");
const Staff = require('../models/StaffModel');
const db = require('../../Setting');

exports.Staff_get_all = (req, res, next) => {
var data = [];
  console.log("GET Staff ALL");
  db.collection("Staff").orderBy('_id').get()
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

exports.Staff_get_Staff = (req, res, next) => {
  console.log("GET Staff BY ID");
  var data = [];
  db.collection("Staff").where('Ids', '==', req.params.Ids).orderBy('_id').get()
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

exports.Staff_create_Staff = (req, res, next) => {
  console.log("POST Staff")
  //console.log(req.body);
  var data = JSON.parse(JSON.stringify(Staff(req.body)));
  console.log(data)
  db.collection('Staff').doc().set(data);
  res.send(data);
}

exports.Staff_edit_Staff = (req, res, next) => {
  db.collection("Staff").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("PUT Staff")
      //console.log(req.body);
      var data = JSON.parse(JSON.stringify(Staff(req.body)));
      console.log(data)
      db.collection('Staff').doc(doc.id).update(data);
    });
      res.send(data);
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

exports.Staff_delete_Staff = (req, res, next) => {
  db.collection("Staff").where('Ids', '==', req.params.Ids).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("DELETE Staff")
      db.collection('Staff').doc(doc.id).delete();
      res.send(doc.data());
    });
  })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
