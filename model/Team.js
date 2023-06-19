const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = Schema({
    team:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Team',teamSchema);