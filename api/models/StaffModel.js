const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Ids :{
        type:String,
        //required: '{PATH} is required!'
    },
    Uid: {
        type:String
    },
    NickName:{
        type:String
    },
    FirstName:{
        type:String
    },
    SurName:{
        type:String
    },
    Phone:{
        type:String
    },
    Email:{
        type:String
    },
    Image:{
        type:String
    }
},{
    timestamps:true
})



module.exports = mongoose.model('Staff',UserSchema);