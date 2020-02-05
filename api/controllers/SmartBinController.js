const express = require("express");
const mongoose = require("mongoose");
const SmartBin = require("../models/SmartBinModel");
const db = require("../../Setting");
var QRCode = require("qrcode");

const User = require("../controllers/UserController");

exports.SmartBin_get_all = (req, res, next) => {
  var data = [];
  console.log("GET SmartBin ALL");

  db.collection("SmartBin")
    .orderBy("_id")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        data.push(doc.data());
      });
      res.json(data);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

exports.SmartBin_get_SmartBin = (req, res, next) => {
  console.log("GET SmartBin BY ID");
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
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

// Generation QR Code Data In SmartBin Image
function GenQRCode(data) {
  return new Promise((resolve, reject) => {
    resolve(QRCode.toDataURL(data));
  });
}


exports.SmartBin_create_SmartBin = async (req, res, next) => {
  console.log("POST SmartBin");

  let qr = await GenQRCode(req.body.Ids);
  //console.log(qr);
  req.body.Image = qr;

  var data = JSON.parse(JSON.stringify(SmartBin(req.body)));
  console.log(data);
  db.collection("SmartBin")
    .doc()
    .set(data);

  res.send(data);

  console.log("finish");
};

exports.SmartBin_edit_SmartBin = (req, res, next) => {
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log("PUT SmartBin");
          //console.log(req.body);
          var data = JSON.parse(JSON.stringify(SmartBin(req.body)));
          console.log(data);
          db.collection("SmartBin")
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

exports.SmartBin_delete_SmartBin = (req, res, next) => {
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          console.log("DELETE SmartBin");
          db.collection("SmartBin")
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

//Complex API
exports.SmartBin_put_SmartBin_ChangeState = (req, res, next) => {
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        snapshot.forEach(doc => {
          db.collection("SmartBin")
            .doc(doc.id)
            .update({ State: req.params.State });
          res.send("PUT State Success");
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};
