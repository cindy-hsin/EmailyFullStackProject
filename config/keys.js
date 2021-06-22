// key.js - figure out what set of credentials to return
if (process.env.NODE_ENV == 'production') {   // NODE_ENV parameter is set to 'production' automatically by Heroku
  // we are in production - return the prod keys
  module.exports = require('./prod');   //prod.js
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev');     // import dev.js & pass it to whoever import this file
}
