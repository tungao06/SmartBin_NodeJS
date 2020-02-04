const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);


const PostSchema = mongoose.Schema({
    Ids: mongoose.Schema.Types.ObjectId,
    Name: {
        type: String,
        required: true
    },
    lat: {
        type: Float ,
        required: true
    },
    lon: {
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