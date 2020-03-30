const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
require("dotenv").config();
// const db = require('../database/db.js')



// variables for database
let yourSelf = 99999;
let db = null;
let usersCollection = null;

let url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL + process.env.DB_END;
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err;
    } else if (client) {
        console.log('Connected to database');
    }
    db = client.db(process.env.DB_NAME);
    usersCollection = db.collection("allUsers");
});


// Home page
router.get('/login', login);
router.post('/', loginSuccesful);
router.get('/', home);
router.get('/profile', profile);
router.get('/matchlist', matchOverview);
router.get('/profiel', profiel);
router.post('/match', youHaveAnMatch);
router.get('/*', errorNotFound); // Error route


function deleteYourself(remove_u) {
    // removes the first item of database collection (the user). Code will be used in three pages.
    let index = remove_u.findIndex(p => p.id === yourSelf);
    completeCollection = remove_u;
    completeCollection.splice(index, 1);
    return completeCollection
}


// functions
async function login(req, res, next) {
    // page to identify user
    try {
        let gebruikers = await usersCollection.find().toArray();

        res.render('login.ejs', { users: gebruikers })
    } catch (err) {
        console.log(err)
    }
};

async function loginSuccesful(req, res, next) {
    // After posting login form on '/login' route, succesfully send to index.ejs and session is printed in console to verify.
    try {
        req.session.currentUser = req.body.user;
        userid = req.session.currentUser;
        userCollection = db.collection("allUsers" + userid);
        res.redirect("/");
        // console.log("You are now logged in as user " + userid);
        console.log(`You are now logged in as user ${req.session.currentUser}`)

        console.log(req.session.currentUser)
    } catch (err) {
        console.log(err)
    }
}

async function home(req, res, next) {
    // Routes function home, graps every user with 'seen: false' and shows them on page.
    try {
        let gebruikers = await usersCollection.find({ seen: false }).toArray();
        let datingUsers = deleteYourself(gebruikers)
        res.render('index.ejs', { users: gebruikers }); // data uit database halen en printen onder noemer 'users' in EJS templates
        console.log(`Signed in as ${req.session.currentUser}`)

    } catch (err) {
        console.log(err)
    }
}


async function profile(req, res, next) {
    // Routes profile page, shows every person his profiledetailed page.
    try {
        let users = await usersCollection.find({ seen: false }).toArray();
        let datingUsers = deleteYourself(users)

        res.render('profile.ejs', { users: users })
    } catch (err) {
        console.log(err);
    }
}


async function youHaveAnMatch(req, res, next) {
    // Route match page, when pressing like, database will be updated with 'seen: true' & 'match: true'. Users gets match page. 
    // When pressing dislike, database will be updated with 'seen: true' & match stays false. Index page will be rerendered. 
    try {
        let users = await usersCollection.find({ seen: false }).toArray();
        let datingUsers = deleteYourself(users)

        let x = (completeCollection.length - 1);
        let terugdraai = (completeCollection.length)

        if (req.body.like) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: true, seen: true } })
            console.log(`you have a like with ${completeCollection[x].name}, and the ID is ${completeCollection[x]._id}`)
            res.render('match.ejs', { users: datingUsers }) // data uit database halen en printen onder noemer 'users' in EJS templates
        } else if (req.body.undo) {
            console.log(completeCollection[terugdraai].name)
                // console.log(terugdraai)
            usersCollection.updateOne({ _id: (completeCollection[terugdraai]._id), seen: true }, { $set: { match: false, seen: false } })
            console.log('Je hebt je match ongedaan gemaakt')
            res.redirect('/');
        } else if (req.body.dislike) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: false, seen: true } })
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
}


async function matchOverview(req, res, next) {
    // Route match overview, graps every user with 'match: true' and will be displayed on overview page.
    try {
        let matches = await usersCollection.find({ match: true }).toArray();
        res.render('matchlist.ejs', { users: matches })
    } catch (err) {
        console.log(err);
    }
}

async function profiel(req, res, next) {
    try {
        // user printen in ejs
        console.log(req.session.currentUser)
        res.render('profiel.ejs', { users: req.session.currentUser })
    } catch (err) {
        console.l
    }
}


async function errorNotFound(req, res, next) {
    // Route for error page, 404.ejs will be loaded. 
    try {
        res.status(404).render('404');
    } catch (err) {
        console.log(err);
    }
}

module.exports = router;