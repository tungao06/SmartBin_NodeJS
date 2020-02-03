const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    Ids: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Location:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }

});



module.exports = mongoose.model('Staff', UserSchema);