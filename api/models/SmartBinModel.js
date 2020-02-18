const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 10);



const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // !! Change Ids to Name in SmartBin
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: Number,
        required: true
    },
    Uid: {
        type: Number,
        required: true
    },
    Type: {
        type: Number,
        required: true
    },
    State: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    UserUid: {
        type: String,
        required: true
    },
    User:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Staff:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    Location:
    {
        type: new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            Name: {
                type: String,
                required: true
            },
            lat: {
                type: Float,
                required: true
            },
            lon: {
                type: Float,
                required: true
            }
        })
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('SmartBin', UserSchema);