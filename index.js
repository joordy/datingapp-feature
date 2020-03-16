// Variabelen aanroepen
const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const session = require('express-session')
const mongo = require('mongodb');
const assert = require('assert');
const app = express();
const PORT = 4000;
require("dotenv").config();

// Database aanroepen
let db = null;
let collectionDatabase = null;
let url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL + process.env.DB_END;

mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err;
    } else if (client) {
        console.log('Connected to database');
    }
    db = client.db(process.env.DB_NAME);
    // collectionDatabase = db.collection("allUsers");
});

// Middleware set-up
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'maximum',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
}))

// Routes 
app.get('/', home);
app.get('/profile', profile);
app.post('/', youHaveAnMatch);
app.get('/matchlist', matchOverview);
app.get('/*', errorNotFound);

// object with 2 arrays, one for liked, one for all users.
// let totalData = { liked: [], a   llUsers };

// Routes functions 
function home(req, res, next) {
    db.collection('allUsers').find().toArray(getData); // collectie omzetten in array
    function getData(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('index.ejs', { users: data }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }
};


function profile(req, res, next) {
    db.collection('allUsers').find().toArray(done); // collectie omzetten in array
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            // console.log(data);
            res.render('profile.ejs', { users: data }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }
};


function youHaveAnMatch(req, res, next) {


    if (req.body.like) {
        db.collection('allUsers').updateOne({ match: false }, { $set: { match: true } })

        console.log('user liked');
        res.redirect('/');
        // code voor object.match updaten naar true, en deze toe te voegen aan collection likedUsers
    } else if (req.body.dislike) {
        console.log('user disliked');
        res.redirect('/');
        // code voor object.match = false en gebruiker "skippen"
    }
};


function matchOverview(req, res, next) {
    // res.render('matchlist', data);
    // console.log(totalData.liked)
    db.collection('allUsers').find().toArray(getData);

    function getData(err, data) {
        console.log(data);
    }
}


function errorNotFound(req, res, next) {
    res.status(404).render('404');
}

// Server deploying
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));