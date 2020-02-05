const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    GoodBin: {
        type: Number
    },
    BadBin: {
        type: Number
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Bin', PostSchema);