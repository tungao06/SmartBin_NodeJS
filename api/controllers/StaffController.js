const express = require("express");
const mongoose = require("mongoose");
const Staff = require('../models/StaffModel');
const db = require('../../Setting');

exports.Staff_get_all = (req, res, next) => {

  //GET Staff All
  console.log("GET Staff ALL");
  var data = [];

  try {
    db.collection("Staff")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          data.push(doc.data());
        });
        res.send(data);
        console.log("GET Staff Complete");
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

exports.Staff_get_Staff = (req, res, next) => {

  //GET Staff BY ID
  console.log("GET Staff BY ID");

  try {
    db.collection("Staff")
      .where("Uid", "==", req.params.Uid)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Staff is empty documents  !!");
          next();
        } else {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            res.send(doc.data());
          });
          console.log("GET Staff completed");
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

exports.Staff_create_Staff = async (req, res, next) => {

  //POST Staff
  console.log("POST Staff");

  try {
    db.collection("Staff").where("Uid", "==", req.body.Uid).get()
      .then(staff => {
        if (staff.empty) {
          var data = JSON.parse(JSON.stringify(Staff(req.body)));

          //POST Staff with JSON
          console.log("POST Staff with JSON");
          db.collection("Staff")
            .doc()
            .set(data);

          res.status(201).send(data);
          console.log("POST Staff completed");
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

exports.Staff_edit_Staff = (req, res, next) => {

  //PUT Staff
  console.log("PUT Staff");

  try {
    //GET Staff By Ids
    console.log("GET Staff By Uid");

    db.collection("Staff")
      .where("Uid", "==", req.params.Uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Staff is empty documents  !!");
          next();
        } else {
          console.log('PUT ' + snapshot.size + ' Item');
          snapshot.forEach(doc => {

            //PUT Staff With JSON
            console.log("PUT Staff With JSON");
            var data = JSON.parse(JSON.stringify(Staff(req.body)));
            console.log(data);
            db.collection("Staff")
              .doc(doc.id)
              .update(data);
            res.send(data);
          });

          console.log("PUT Staff Complete")
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

exports.Staff_delete_Staff = (req, res, next) => {

  //GET Staff By Ids
  console.log("GET Staff By Ids");
  db.collection("Staff")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        next()
      } else {
        //DELETE Staff By Ids
        snapshot.forEach(doc => {
          //DELETE Staff
          console.log("DELETE Staff");
          db.collection("Staff")
            .doc(doc.id)
            .delete();
          res.send(doc.data());
        });

        console.log("DELETE Staff Complete");
        console.log("***********************");
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
