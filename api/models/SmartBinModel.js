const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 10);



const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Ids: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
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
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        }]
}, {
    timestamps: true
});



module.exports = mongoose.model('SmartBin', UserSchema);