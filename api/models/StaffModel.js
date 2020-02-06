const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
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
    NickName: {
        type: String
    },
    FirstName: {
        type: String
    },
    SurName: {
        type: String
    },
    Phone: {
        type: String
    },
    Email: {
        type: String
    },
    Image: {
        type: String
    },
    SmartBin:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SmartBin'
            , required: true
        }
}, {
    timestamps: true
})



module.exports = mongoose.model('Staff', UserSchema);