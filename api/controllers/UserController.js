const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const db = require("../../Setting");

exports.User_get_all = (req, res, next) => {
  var data = [];
  console.log("GET User ALL");
  db.collection("User")
    .orderBy("_id")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        data.push(doc.data());
      });
      res.send(data);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

exports.User_get_User = (req, res, next) => {
  console.log("GET User BY ID");
  var data = [];
  db.collection("User")
    .where("Uid", "==", req.params.Uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          res.send(doc.data());
        });
        console.log("finish");
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.send(err);
    });
};

exports.User_create_User = (req, res, next) => {
  console.log("POST User");
  //console.log(req.body);
  var data = JSON.parse(JSON.stringify(User(req.body)));
  console.log(data);
  db.collection("User")
    .doc()
    .set(data);
  res.send(data);
};

exports.User_edit_User = (req, res, next) => {
  db.collection("User")
    .where("Uid", "==", req.params.Uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log("PUT User");
          //console.log(req.body);
          var data = JSON.parse(JSON.stringify(User(req.body)));
          console.log(data);
          db.collection("User")
            .doc(doc.id)
            .update(data);
          res.send(data);
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

exports.User_delete_User = (req, res, next) => {
  db.collection("User")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log("DELETE User");
          db.collection("User")
            .doc(doc.id)
            .delete();
          res.send(doc.data());
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

// Edit Point
exports.User_edit_Point = (req, res, next) => {
  db.collection("User")
    .where("Uid", "==", req.params.Uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log("PUT User");
          db.collection("User")
            .doc(doc.id)
            .update({Point: req.params.Point});
          res.send(doc.data());
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
//Complex API
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
