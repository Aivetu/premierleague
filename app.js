require('dotenv').config();
const express = require('express');
const  mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const app = express();
const cookieParser= require('cookie-parser');
const verifyJwt = require('./middleware/VerifyJwt');
const PORT = process.env.PORT || 8080 ;

connectDB();

app.use(express.json());

app.use(cookieParser());


app.use('/register',require("./routes/register"));
app.use('/login',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));


app.use(verifyJwt);
app.use('/team',require('./routes/api/teams'));
app.use('/fixture',require('./routes/api/fixtures'));


module.exports = app;