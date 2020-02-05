const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);



const UserSchema = new mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    Ids: {
        type: String,
        required: true
    },
    Status: {
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