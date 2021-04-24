require("dotenv").config();
const express = require("express");

//Database
require('./configs/db.config');

//Debugger
require('./configs/debugger.config');

const app = express();

require('./configs/middleware.config')(app);
require('./configs/views.config')(app);
require('./configs/locals.config')(app);
require('./configs/session.config')(app);
require('./configs/passport.config')(app);
//require('./configs/passport.config')(app);

const index = require("./routes/index");
const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/categories");
const serviceRouter = require("./routes/service");
const profileRouter = require("./routes/profile");

app.use("/", index);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/service", serviceRouter);
app.use("/profile", profileRouter);

module.exports = app;
