

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path"); //I added this dependency

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require('./routing/api-routes.js')(app);
require('./routing/html-routes.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// If you change force: false to true. It wipes out the database. 
// You only ever use this for developing/testing
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
