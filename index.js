// require packages
const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongo = require('mongodb');
const assert = require('assert');
const app = express();
const PORT = 4000;
require("dotenv").config();

// variables for database
let yourSelf = 99999;
// let allUsers = [];
let db = null;
let usersCollection = null;


// call database
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


// Middleware set-up
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
        // cookie: { secure: true }
}))


// Page routes 
app.get('/login', login);
app.post('/', loginSuccesful);
app.get('/', home);
app.get('/profile', profile);
app.get('/matchlist', matchOverview);
app.post('/match', youHaveAnMatch);
app.get('/*', errorNotFound); // Error route


function deleteYourself(remove_u) {
    // removes the first item of database collection (the user). Code will be used in three pages.
    let index = remove_u.findIndex(p => p.id === yourSelf);
    completeCollection = remove_u;
    completeCollection.splice(index, 1);
    return completeCollection
}


async function login(req, res, next) {
    // page to identify user
    try {
        res.render('login.ejs')
    } catch (err) {
        console.log(err)
    }
}


async function loginSuccesful(req, res, next) {
    // After posting login form on '/login' route, succesfully send to index.ejs and session is printed in console to verify.
    try {
        req.session.currentUser = req.body.user;
        userid = req.session.currentUser;
        userCollection = db.collection("allUsers" + userid);
        res.redirect("/");
        console.log("You are now logged in as user " + userid);
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

        if (req.body.like) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: true, seen: true } })
            console.log(`you have a like with ${completeCollection[x].name}, and the ID is ${completeCollection[x]._id}`)
            res.render('match.ejs', { users: datingUsers }) // data uit database halen en printen onder noemer 'users' in EJS templates
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


async function errorNotFound(req, res, next) {
    // Route for error page, 404.ejs will be loaded. 
    try {
        res.status(404).render('404');
    } catch (err) {
        console.log(err);
    }
}


// Server deploying on https://localhost:4000.
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));