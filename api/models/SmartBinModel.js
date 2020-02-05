const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,10);



const UserSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    Ids: {
        type: String,
        required: true
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
    Location:
        [
            {
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
            }]

}, {
    timestamps: true
});



module.exports = mongoose.model('SmartBin', UserSchema);