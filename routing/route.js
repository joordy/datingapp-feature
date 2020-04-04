const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
require('dotenv').config();

// connecting to database
let db = null;
let usersCollection = null;
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}${process.env.DB_END}`;
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(
  err,
  client
) {
  if (err) {
    throw err;
  } else if (client) {
    console.log('Connected to database');
  }
  db = client.db(process.env.DB_NAME);
  usersCollection = db.collection('allUsers');
});

// Routing
router.get('/login', login);
router.post('/', loginSuccesful);
router.get('/', userIsSignedIn, home);
router.get('/profile', userIsSignedIn, profile);
router.get('/matchlist', userIsSignedIn, matchOverview);
router.get('/profiel', userIsSignedIn, profiel);
router.post('/logout', logOut);
router.post('/match', userIsSignedIn, youHaveAnMatch);
router.get('/*', errorNotFound);

function deleteYourself(remove_u) {
  // To remove myself from match page
  let yourSelf = usersCollection.find({ _id: '5e70aa4227f0bb83c16adf21' });
  let index = remove_u.findIndex(p => p.id === yourSelf);
  completeCollection = remove_u;
  return completeCollection;
}

function userIsSignedIn(req, res, next) {
  // To check, if the user is signed in, otherwise render index.ejs
  if (req.session.currentUser != undefined) return next();
  res.redirect('/login');
}

// functions of routing
async function login(req, res, next) {
  // Login page, to identify the user and store this one in the session.
  try {
    let gebruikers = await usersCollection.find().toArray();
    res.render('login.ejs', { users: gebruikers });
  } catch (err) {
    next(err);
  }
}

async function loginSuccesful(req, res, next) {
  // After posting login form on '/login' route, succesfully send to index.ejs and session is printed in console to verify.
  try {
    req.session.currentUser = req.body.user;
    res.redirect('/');
    console.log(`You are now logged in as user ${req.session.currentUser}`);
  } catch (err) {
    next(err);
  }
}

async function home(req, res, next) {
  // Routes function home, graps every user with 'seen: false' and shows them on page.
  try {
    let gebruikers = await usersCollection.find({ seen: false }).toArray();
    res.render('index.ejs', { users: gebruikers });
  } catch (err) {
    next(err);
  }
}

async function profile(req, res, next) {
  // Routes profile page, shows every person his profiledetailed page.
  try {
    let gebruikers = await usersCollection.find({ seen: false }).toArray();
    res.render('profile.ejs', { users: gebruikers });
  } catch (err) {
    next(err);
  }
}

async function youHaveAnMatch(req, res, next) {
  // Route match page, when pressing like, database will be updated with 'seen: true' & 'match: true'. Users gets match page.
  // When pressing dislike, database will be updated with 'seen: true' & match stays false. Index page will be rerendered.
  try {
    let gebruikers = await usersCollection.find({ seen: false }).toArray();
    let matchedUsers = deleteYourself(gebruikers);
    let x = completeCollection.length - 1;

    if (req.body.like) {
      usersCollection.updateOne(
        { _id: completeCollection[x]._id },
        { $set: { match: true, seen: true } }
      );
      console.log(
        `you have a like with ${completeCollection[x].name}, and the ID is ${completeCollection[x]._id}`
      );
      res.render('match.ejs', { users: matchedUsers });
    } else if (req.body.undo) {
      console.log('undo');
      res.redirect('/');
    } else if (req.body.dislike) {
      usersCollection.updateOne(
        { _id: completeCollection[x]._id },
        { $set: { match: false, seen: true } }
      );
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
}

async function matchOverview(req, res, next) {
  // Route match overview, graps every user with 'match: true' and will be displayed on overview page.
  try {
    let allMatches = await usersCollection.find({ match: true }).toArray();
    res.render('matchlist.ejs', { users: allMatches });
  } catch (err) {
    next(err);
  }
}

async function profiel(req, res, next) {
  // Profiel page, user can sign out here.
  try {
    res.render('profiel.ejs', { users: req.session.currentUser });
  } catch (err) {
    next(err);
  }
}

async function logOut(req, res, next) {
  // Logout function, sends it back to login route.
  try {
    req.session.destroy();
    console.log(
      'Your session is destroyed. You can log in again to use the application.'
    );
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
}

async function errorNotFound(req, res, next) {
  // Route for error page, 404.ejs will be loaded.
  try {
    res.status(404).render('404');
  } catch (err) {
    next(err);
  }
}

module.exports = router;
