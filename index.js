const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3000;
const app = express();
exports.app = app;
const path = require('path');


// use express router $router
const db = require("./config/mongoose");
// importing passport 
const passport = require('passport');


app.use(express.urlencoded());
app.use(cookieParser());


app.use('/', require('./routes'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use('./views', express.static('views'));
// view engine called
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




// post listening here 
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Server is running on Port", port);
});
