const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    username:{
        type: String,
        required:true
    },
    roles:{
        User: {
            type: Number,
            default: 2001
        },
        Admin:{
            type:Number
        }
    },
    password:{
        type:String,
        required:true
    },
    dateCreated: {
        type: String
    },
    refreshToken: String,
    sessionID:String
})

module.exports = mongoose.model('User',userSchema);