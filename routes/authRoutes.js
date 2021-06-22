const passport = require('passport'); // import the original passport npm module, not the services/passport.js we created.


module.exports = app => {
  // Route handler: Whenever a 'get'-type user request comes to '/auth/google' route (in our case, user will be directed to this route after
  // clicking 'Login' on Client side), tell passport to start the authentication flow, using 'google' strategy.
  app.get(
    '/auth/google',
    passport.authenticate('google',     // Internally, GoogleStrategy has an identifier: 'google'. So here, passport is told to use the above defined GoogleStrategy to do authentication.
    {
      scope: ['profile','email']        // Ask Google server to give us access to user's 'profile' and 'email'.
    })
  );

  // Route handler: When user is sent back to our server after granting permission at Google,
  // tell passport to authenticate with 'google' strategy again. This time, passport will see the 'code' attached in the callback URL,
  // knowing that the user has finished granting permision. So, passport will automatically take the 'code' and send a follow up request to Google, to
  // exchange for this user's info.
  app.get('/auth/google/callback',passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();         // kill the user id from the received cookie data, reset req.user to empty; Set cookie to empty
    res.send(req.user);  // empty
  })


  /*After successful login, whenever a follow-up request comes (with a cookie token),
    passport automatically attaches the deserialized User model instance to req object  */
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
