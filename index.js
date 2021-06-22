const express = require('express');   // import express library(common JS module)
const mongoose = require('mongoose'); // import mongoose library
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');           // Load Mongoose model class configuration. Inform Mongoose that it's responsible for creating a User collection.
require('./services/passport');   // passport.js doesn't export anything, so this require statement returns nothing.
                                  // It justs ensures that the code in passport.js will be EXECUTED as part of index.js when server runs.


mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();      // generate the app object-> the underlying running express server
/*Enable cookie in express*/
app.use(
  cookieSession({           // configuration object
    maxAge: 30 * 24 * 60 * 60 * 1000,               // time duration(ms) before this cookie can expires in the browser: 30days
    keys: [keys.cookieKey]                          // keys for encrypting cookie token(user.id).
  })
);
/*Instruct passport to use cookie session to manage authentication*/
app.use(passport.initialize());
app.use(passport.session());      // Inherantly calls passport.deserializeUser()

/*Attach route handlers to app*/
require('./routes/authRoutes')(app);  // require: returns the authRoutes exported function. Call that function on app object.

const PORT = process.env.PORT || 5000 //look at the underlying environment, and see if they have prepared a port for us to use.
// process.env.PORT: the port number assigned by Heroku, if this app is run on Heroku (production environment)
// 5000:  the local host port number, if the app is run on local machine (development environment)
app.listen(PORT);
