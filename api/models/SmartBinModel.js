const mongoose = require('mongoose');


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
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }]

},{
    timestamps:true
});



module.exports = mongoose.model('SmartBin', UserSchema);