const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    GoodBin: {
        type: Number
    },
    BadBin: {
        type: Number
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Bin', PostSchema);