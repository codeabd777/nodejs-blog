const express = require("express");
require('dotenv').config()
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require ("express-flash")
const connect = require("./models/db")
const profileRoutes = require("./routs/profilerouts")
const postRoutes = require("./routs/postRoutes")
const app = express();
const userRoutes = require("./routs/userRoutes")
const PORT = process.env.PORT || 2000;
//DB connection 
connect();
//express session middleware
const store = new MongoDBStore({
  uri: process.env.DB, 
  collection: 'sessions'
})
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge:1000 * 7 * 24 * 60 * 60 
    },
    store: store
  }))
  //flash middlevare
  app.use(flash())
  app.use((req, res, next) => {
    res.locals.message = req.flash()
    next();
  })
//load static files
app.use(express.static("./views"));
app.use(express.urlencoded({ extended: true}));
//set ejs
app.set("view engine", "ejs")
//Routes
app.use(userRoutes);
app.use(profileRoutes)
app.use (postRoutes)
//create server
app.listen(PORT, () => {
    console.log(`server runing on port number: ${PORT}`)
});