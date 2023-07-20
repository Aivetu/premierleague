const app = require('./app.js');
const  mongoose = require('mongoose');



mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=> console.log(`Application is running on ${PORT}`));

})
