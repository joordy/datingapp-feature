// Require packages
const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

// Variables
let nameLoggedIn = 'Jordy Fronik';
let idLoggedIn = '5e70aa4227f0bb83c16adf21';
let db = null;
let usersCollection = null;
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}${process.env.DB_END}`;

// connecting to database
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function (
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
router.post('/login', loginSuccesful);
router.get('/', userIsSignedIn, home);
router.get('/profile', userIsSignedIn, userProfile);
router.get('/matchlist', userIsSignedIn, matchOverview);
router.get('/profiel', userIsSignedIn, profiel);
router.post('/logout', logOut);
router.post('/match', userIsSignedIn, youHaveAnMatch);
router.get('/*', errorNotFound);

function userIsSignedIn(req, res, next) {
  // To check, if the user is signed in, otherwise render index.ejs
  if (req.session.currentUser != undefined) {
    return next();
  }
  res.redirect('/login');
}

async function login(req, res, next) {
  // Login page, to identify the user and store this one in the session.
  try {
    let allUsers = await usersCollection.find().toArray();
    res.render('login.ejs', { users: allUsers });
  } catch (err) {
    next(err);
  }
}

async function loginSuccesful(req, res, next) {
  // After posting login form on '/login' route, succesfully send to index.ejs and session is printed in console to verify.
  try {
    req.session.currentUser = req.body.user;
    console.log(`You are now logged in as user ${req.session.currentUser}`);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

function removeUser(user) {
  // To remove myself from array
  return user.name !== nameLoggedIn;
}

function showMe(user) {
  // To get myself out of array
  return user.name === nameLoggedIn;
}

async function home(req, res, next) {
  // Routes function home, graps every user with 'seen: false' and shows them on page.
  try {
    let database = await usersCollection.find().toArray();
    let myself = database.filter(showMe);
    let liked = myself[0].liked;
    let disliked = myself[0].disliked;
    let proberen = await usersCollection
      .find({
        $and: [
          { name: { $ne: nameLoggedIn } },
          { _id: { $nin: liked } },
          { _id: { $nin: disliked } },
        ],
      })
      .toArray();

    res.render('index.ejs', { users: proberen });
  } catch (err) {
    next(err);
  }
}

async function userProfile(req, res, next) {
  // Routes profile page, shows every person his profiledetailed page.
  try {
    let database = await usersCollection.find().toArray();
    let myself = database.filter(showMe);
    let liked = myself[0].liked;
    let disliked = myself[0].disliked;
    let proberen = await usersCollection
      .find({
        $and: [
          { name: { $ne: nameLoggedIn } },
          { _id: { $nin: liked } },
          { _id: { $nin: disliked } },
        ],
      })
      .toArray();

    let lastUser = proberen[proberen.length - 1];
    // consoe.log(test);
    res.render('profile.ejs', { users: lastUser });
  } catch (err) {
    next(err);
  }
}

function updateDatabase(input, user) {
  if (input.like) {
    usersCollection.updateOne(
      { name: nameLoggedIn },
      { $push: { liked: user._id } }
    );
    return true;
  } else if (input.dislike) {
    usersCollection.updateOne(
      { name: nameLoggedIn },
      { $push: { disliked: user._id } }
    );
    return false;
  }
}
async function youHaveAnMatch(req, res, next) {
  // Route match page, when pressing like, database will be updated with 'seen: true' & 'match: true'. Users gets match page.
  // When pressing dislike, database will be updated with 'seen: true' & match stays false. Index page will be rerendered.
  try {
    let database = await usersCollection.find().toArray();
    let myself = database.filter(showMe);
    let liked = myself[0].liked;
    let disliked = myself[0].disliked;
    let proberen = await usersCollection
      .find({
        $and: [
          { name: { $ne: nameLoggedIn } },
          { _id: { $nin: liked } },
          { _id: { $nin: disliked } },
        ],
      })
      .toArray();
    let indexUser = proberen.length - 1;
    let user = proberen[indexUser];

    let value = updateDatabase(req.body, user);
    if (value === true) {
      console.log(
        `you have a like with ${user.name}, and the ID is ${user._id}`
      );
      res.render('match.ejs', { users: user });
    } else if (value === false) {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
}
// Try

async function matchOverview(req, res, next) {
  // Route match overview, graps every user with 'match: true' and will be displayed on overview page.
  try {
    let database = await usersCollection.find().toArray();
    let myself = database.filter(showMe);
    let liked = myself[0].liked;

    let test = usersCollection.findOne({ _id: idLoggedIn }).toArray;
    // usersCollection.find({ _id: idLoggedIn }); // user session ID will be stored
    // let matches = usersCollection
    //   .find({
    //     $and: [
    //       { _id: idLoggedIn },
    //       { _id: { $in: liked } },
    //     ],
    //   })
    //   .toArray();

    // let allUsers = await usersCollection.find().toArray();
    // let myself = allUsers.filter(showMe);
    console.log(liked);
    res.render('matchlist.ejs', { users: test });
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
