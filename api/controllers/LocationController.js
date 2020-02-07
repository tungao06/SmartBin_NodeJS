const express = require("express");
const mongoose = require("mongoose");
const Location = require('../models/LocationModel');
const db = require('../../Setting');

exports.Location_get_all = (req, res, next) => {

  // TODO : GET Location All
  console.log("GET Location ALL");
  var data = [];

  try {
    db.collection("Location")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          data.push(doc.data());
        });
        res.send(data);
        console.log("GET Location Complete");
        console.log("***********************");
      })
      .catch(err => {
        console.log("Error getting documents :", err);
      });
  }
  catch (err) {
    console.log('Error :', err);
    next()

  }
};

exports.Location_get_Location = (req, res, next) => {

  // TODO : GET Location BY ID
  console.log("GET Location BY ID");

  try {
    db.collection("Location")
      .where("_id", "==", req.params._id)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Location is empty documents  !!");
          next();
        } else {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            res.send(doc.data());
          });
          console.log("GET Location completed");
          console.log("***********************");
        }
      })
      .catch(err => {
        console.log("Error getting documents :", err);
        res.send(err);
      });
  }
  catch (err) {
    console.log('Error :', err);
    next()
  }
};

exports.Location_create_Location = async (req, res, next) => {

  // TODO : POST Location
  console.log("POST Location");

  try {
    var data = JSON.parse(JSON.stringify(Location(req.body)));

    // TODO : POST Location with JSON
    console.log("POST Location with JSON");
    db.collection("Location")
      .doc()
      .set(data);

    res.status(201).send(data);
    console.log("POST Location completed");
    console.log("***********************");
  }
  catch (err) {
    console.log('Error :', err);
    next()
  }
};

exports.Location_edit_Location = (req, res, next) => {

  // TODO : PUT Location
  console.log("PUT Location");

  try {
    // TODO : GET Location By Ids
    console.log("GET Location By Uid");

    db.collection("Location")
      .where("_id", "==", req.params._id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Location is empty documents  !!");
          next();
        } else {
          console.log('PUT ' + snapshot.size + ' Item');
          snapshot.forEach(doc => {

            // TODO : PUT Location With JSON
            console.log("PUT Location With JSON");
            var data = JSON.parse(JSON.stringify(Location(req.body)));
            console.log(data);
            db.collection("Location")
              .doc(doc.id)
              .update(data);
            res.send(data);
          });

          console.log("PUT Location Complete")
          console.log("***********************");
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
        next()
      });
  }
  catch (err) {
    console.log('Error :', err);
    next()
  }
};

exports.Location_delete_Location = (req, res, next) => {

  // TODO : GET Location By Ids
  console.log("GET Location By _id");
  db.collection("Location")
    .where("_id", "==", req.params._id)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        next()
      } else {
        // TODO : DELETE Location By Ids
        snapshot.forEach(doc => {
          // TODO : DELETE Location
          console.log("DELETE Location");
          db.collection("Location")
            .doc(doc.id)
            .delete();
          res.send(doc.data());
        });

        console.log("DELETE Location Complete");
        console.log("***********************");
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
