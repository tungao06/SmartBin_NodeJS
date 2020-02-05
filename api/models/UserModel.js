const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    Ids: {
      type: String
      //required: '{PATH} is required!'
    },
    Uid: {
      type: String
    },
    Name: {
      type: String
    },
    Email: {
      type: String
    },
    Phone: {
      type: String
    },
    Photo: {
      type: String
    },
    Point: {
      type: Number
    },
    GoodBin: {
      type: Number
    },
    BadBin: {
      type: Number
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
