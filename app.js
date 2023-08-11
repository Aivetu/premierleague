require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const verifyJwt = require("./middleware/VerifyJwt");
const register = require("./routes/register");
const login = require("./routes/auth");
const refresh = require("./routes/refresh");
const team = require("./routes/api/teams");
const fixtures = require("./routes/api/fixtures");

app.use(express.json());

app.use(cookieParser());

app.use("/register", register);
app.use("/login", login);
app.use("/refresh", refresh);

app.use(verifyJwt);
app.use("/team", team);
app.use("/fixture", fixtures);

module.exports = app;
