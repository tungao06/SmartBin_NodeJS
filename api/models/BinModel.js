const mongoose  = require('mongoose');


const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    GoodBin:{
        type:String,
    },
    BadBin :{
        type: String
    },
    User :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})


module.exports = mongoose.model('Bin',PostSchema);