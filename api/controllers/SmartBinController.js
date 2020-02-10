const express = require("express");
const mongoose = require("mongoose");
const SmartBin = require("../models/SmartBinModel");
const Location = require("../models/LocationModel");
const db = require("../../Setting");
var QRCode = require("qrcode");

const User = require("../controllers/UserController");

exports.SmartBin_get_all = (req, res, next) => {

  // TODO : GET SmartBin All
  console.log("GET SmartBin ALL");
  var data = [];

  try {
    db.collection("SmartBin")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          data.push(doc.data());
        });
        res.send(data);
        console.log("GET SmartBin Complete");
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

exports.SmartBin_get_SmartBin = (req, res, next) => {

  // TODO : GET SmartBin BY ID
  console.log("GET SmartBin BY ID");

  try {
    db.collection("SmartBin")
      .where("Ids", "==", req.params.Ids)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("SmartBin is empty documents  !!");
          next();
        } else {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            res.send(doc.data());
          });
          console.log("GET SmartBin completed");
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

// TODO :  Generation QR Code Data In SmartBin Image
function GenQRCode(data) {
  return new Promise((resolve, reject) => {
    resolve(QRCode.toDataURL(data));
  });
}

exports.SmartBin_create_SmartBin = async (req, res, next) => {

  // TODO : POST SmartBin
  console.log("POST SmartBin");

  try {
    // TODO : Gen QR Code By SmartBin Ids
    console.log("Gen QR Code By SmartBin Ids");
    let qr = await GenQRCode(req.body.Ids);
    req.body.Image = qr;

    // TODO : GET Check Location By _id
    console.log("GET Check Location By _id");
    db.collection("Location").where("_id", "==", req.body.Location[0]._id).get()
      .then(location => {
        if (location.empty) {
          console.log("Location is empty documents  !!");
          next()
        } else {
          db.collection("SmartBin").where("Ids", "==", req.body.Ids).get()
            .then(smartbin => {
              if (smartbin.empty) {
                var data = JSON.parse(JSON.stringify(SmartBin(req.body)));

                // TODO : POST SmartBin with JSON
                console.log("POST SmartBin with JSON");
                db.collection("SmartBin")
                  .doc()
                  .set(data);

                res.status(201).send(data);
                console.log("POST SmartBin completed");
                console.log("***********************");
              } else {
                console.log("SmartBin by Ids isn't Unique   !!");
                next()

              }
            })
            .catch(err => {
              console.log('Transaction failure! :', err);
              next()
            });
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

exports.SmartBin_edit_SmartBin = (req, res, next) => {

  // TODO : PUT SmartBin
  console.log("PUT SmartBin");

  try {
    // TODO : GET SmartBin By Ids
    console.log("GET SmartBin By Ids");

    db.collection("SmartBin")
      .where("Ids", "==", req.params.Ids)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("SmartBin is empty documents  !!");
          next();
        } else {

          // TODO : GET Check Location By _id
          console.log("GET Check Location By _id");
          db.collection("Location")
            .where("_id", "==", req.body.Location[0]._id)
            .get()
            .then(location => {
              if (location.empty) {
                console.log("Location is empty documents  !!");
                next()
              } else {
                console.log('PUT ' + snapshot.size + ' Item');
                snapshot.forEach(doc => {

                  // TODO : PUT SmartBin With JSON
                  console.log("PUT SmartBin With JSON");
                  var data = JSON.parse(JSON.stringify(SmartBin(req.body)));
                  console.log(data);
                  db.collection("SmartBin")
                    .doc(doc.id)
                    .update(data);
                res.send(data);
                });

                console.log("PUT SmartBin Complete")
                console.log("***********************");
              }
            })
            .catch(err => {
              console.log('Transaction failure! :', err);
              next()
            });
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


exports.SmartBin_delete_SmartBin = (req, res, next) => {

  // TODO : GET SmartBin By Ids
  console.log("GET SmartBin By Ids");
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        next()
      } else {
        // TODO : DELETE SmartBin By Ids
        snapshot.forEach(doc => {
          // TODO : DELETE SmartBin
          console.log("DELETE SmartBin");
          db.collection("SmartBin")
            .doc(doc.id)
            .delete();
          res.send(doc.data());

          console.log("DELETE SmartBin Complete");
          console.log("***********************");
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};


// ! : Complex API
exports.SmartBin_put_SmartBin_ChangeState_Uid = (req, res, next) => {
  var docId;
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        // TODO : Put State
        snapshot.forEach(doc => {
          db.collection("SmartBin")
            .doc(doc.id)
            .update({ State: req.params.State, UserUid: req.params.UserUid });
          res.send("PUT State Success");
          docId = doc.id
          //console.log(state);
          //Snapshot State
          console.log(this.state);
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};


exports.SmartBin_put_SmartBin_ChangeState = (req, res, next) => {

  // TODO : GET SmartBin By Ids
  console.log("GET SmartBin By Ids");
  db.collection("SmartBin")
    .where("Ids", "==", req.params.Ids)
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return next();
      } else {
        // TODO : Put State
        console.log("Put State");
        snapshot.forEach(doc => {
          db.collection("SmartBin")
            .doc(doc.id)
            .update({ State: req.params.State });
          res.send(doc.data());
        });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};


var i = 0;
// TODO : Snapshot State In SmartBin
db.collection("SmartBin")
  .orderBy('State')
  .onSnapshot(
    snapshot => {
      snapshot.docChanges().forEach(doc => { // ? when Change doc will do it ..
        //console.log(`Received doc snapshot: ${doc.doc.data().State}`)
        switch (doc.doc.data().State) {
          case "0":
            i++
            console.log(`OFF : ${i}`);
            break;
          case "1":
            i++
            console.log(`WAITING : ${i}`);
            break;
          case "2":
            i++
            console.log(`START : ${i}`);
            break;
        }
      });
    },
    err => {
      console.log(`Encountered error: ${err}`);
    }
  );
