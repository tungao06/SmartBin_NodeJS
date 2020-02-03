const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Latitude: {
        type: String,
        required: true
    },
    Longitude: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Location', PostSchema);