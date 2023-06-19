require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConn');
const app = express();
const PORT = process.env.PORT || 4400 ;

connectDB();

app.use(express.json());



app.use('/create',require("./routes/register"));
app.use('/login',require('./routes/auth'));



app.listen(PORT,()=> console.log(`Application is running on ${PORT}`));