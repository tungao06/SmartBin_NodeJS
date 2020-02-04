const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);


const PostSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Name: {
        type: String,
        required: true
    },
    Latitude: {
        type: Float ,
        required: true
    },
    Longitude: {
        type: Float ,
        required: true
    },
    SmartBin:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SmartBin'
    }
});


module.exports = mongoose.model('Location', PostSchema);