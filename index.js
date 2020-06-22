const // Require packages
  express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  mongo = require('mongodb'),
  assert = require('assert'),
  routing = require('./routing/route.js'),
  // Variables
  app = express(),
  PORT = process.env.PORT || process.env.DB_PORT;

require('dotenv').config();

// Middleware set-up
app
  .set('view engine', 'ejs')
  .set('views', 'view-ejs')
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      secure: true,
    })
  )
  .use('/', routing)

  // Server deploying on https://localhost:4000.
  .listen(PORT, () => console.log(`App is listening on ${PORT}!`));
