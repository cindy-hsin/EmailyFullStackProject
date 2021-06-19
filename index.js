const express = require('express');   // import express library
const app = express();      // generate the app object-> the underlying running express server

app.get('/',(req, res) => {
  res.send({hi: 'there'});
});


const PORT = process.env.PORT || 5000 //look at the underlying environment, and see if they have prepared a port for us to use.
// process.env.PORT: the port number assigned by Heroku, if this app is run on Heroku (production environment)
// 5000:  the local host port number, if the app is run on local machine (development environment)
app.listen(PORT);
