const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const db = require("../../Setting");


exports.User_get_all = (req, res, next) => {

  // TODO : GET User All
  console.log("GET User ALL");
  var data = [];

  try {
    db.collection("User")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          data.push(doc.data());
        });
        res.send(data);
        console.log("GET User Complete");
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

exports.User_get_User = (req, res, next) => {

  // TODO : GET User BY ID
  console.log("GET User BY ID");

  try {
    db.collection("User")
      .where("Uid", "==", req.params.Uid)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("User is empty documents  !!");
          next();
        } else {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            res.send(doc.data());
          });
          console.log("GET User completed");
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

exports.User_create_User = async (req, res, next) => {

  // TODO : POST User
  console.log("POST User");

  try {
    db.collection("User").where("Uid", "==", req.body.Uid).get()
      .then(user => {
        if (user.empty) {
          var data = JSON.parse(JSON.stringify(User(req.body)));

          // TODO : POST User with JSON
          console.log("POST User with JSON");
          db.collection("User")
            .doc()
            .set(data);

          res.status(201).send(data);
          console.log("POST User completed");
          console.log("***********************");
        } else {
          console.log("User by Ids isn't Unique   !!");
          next()

        }
      })
      .catch(err => {
        console.log('Transaction failure! :', err);
        next()
      });

  }
  catch (err) {
    console.log('Error :', err);
    next()
  }
};

exports.User_edit_User = (req, res, next) => {

  // TODO : PUT User
  console.log("PUT User");

  try {
    // TODO : GET User By Ids
    console.log("GET User By Ids");

    db.collection("User")
      .where("Uid", "==", req.params.Uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("User is empty documents  !!");
          next();
        } else {
          console.log('PUT ' + snapshot.size + ' Item');
          snapshot.forEach(doc => {

            // TODO : PUT User With JSON
            console.log("PUT User With JSON");
            req.body.Bin = doc.data().Bin
            req.body.Bin = doc.data().Bin
            var data = JSON.parse(JSON.stringify(User(req.body)));
            console.log(data);
            db.collection("User")
              .doc(doc.id)
              .update(data);
            res.send(data);
          });

          console.log("PUT User Complete")
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

exports.User_delete_User = (req, res, next) => {

  // TODO : GET User By Ids
  console.log("GET User By Ids");
  db.collection("User")
    .where("Uid", "==", req.params.Uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        next()
      } else {
        // TODO : DELETE User By Ids
        snapshot.forEach(doc => {
          // TODO : DELETE User
          console.log("DELETE User");
          db.collection("User")
            .doc(doc.id)
            .delete();
          res.send(doc.data());

          console.log("DELETE User Complete");
          console.log("***********************");
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

//! Complex API
exports.User_edit_User_Bin = (req, res, next) => {
  db.collection("User")
    .where("Uid", "==", req.params.Uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          var gb = parseInt(doc.data().GoodBin);
          var bb = parseInt(doc.data().BadBin);
          gb += parseInt(req.params.GoodBin);
          bb += parseInt(req.params.BadBin);
          console.log("PUT User");
          db.collection("User")
            .doc(doc.id)
            .update({ GoodBin: gb, BadBin: bb });
          res.send(doc.data());
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
