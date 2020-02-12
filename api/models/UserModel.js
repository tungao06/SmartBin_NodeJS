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
      type: Number,
      default: 0
    },
    Bin: {
      type: new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        GoodBin: {
          type: Number,
          default: 0
        },
        BadBin: {
          type: Number,
          default: 0
        }
      })
    },
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
