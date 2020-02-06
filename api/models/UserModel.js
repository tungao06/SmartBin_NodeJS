const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    Ids: {
      type: String,
      unique: true
      //required: '{PATH} is required!'
    },
    Uid: {
      type: String,
      unique: true
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
    Bin: [{
      type: new mongoose.Schema({
        GoodBin: {
          type: Number
        },
        BadBin: {
          type: Number
        }
      })
    }],
    SmartBin:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SmartBin'
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
