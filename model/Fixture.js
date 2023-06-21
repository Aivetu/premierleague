const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fixtureSchema = Schema({
    teamA :{
        type:String,
        required:true
    },
teamB:{
        type:String,
        required:true 
    },
status:{
    type:String,
    required:true 
}

})
module.exports = mongoose.model("fixture",fixtureSchema);