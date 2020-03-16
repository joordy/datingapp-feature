// Variabelen aanroepen
const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 4000;
const mongo = require('mongodb');
const assert = require('assert');
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

// object with 2 arrays, one for liked, one for all users.
// let totalData = { liked: [], allUsers };

// app.get('/', (req, res) => {
//     res.render('index', totalData);
// });
// function database() {
//     db.collection('allUsers').find().toArray(done)

//     function done(err, data) {
//         if (err) {
//             next(err);
//         } else {
//             // console.log(data);
//             console.log(data)
//         }
//     }
// } // database();


// Routing
app.get('/', (req, res) => {
    db.collection('allUsers').find().toArray(done); // collectie omzetten in array

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            // console.log(data);
            res.render('index.ejs', { users: data }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }

});

app.post('/match', (req, res) => {
    db.collection('allUsers').find().toArray(done);

    function done(err, data) {
        console.log(data);
    }

    if (req.body.like) {
        // collection.find()
        // if (req.body.like) {
        //     console.log(users._id)
        // }
        console.log('user liked');
        res.render('match.ejs');

        // console.log(req.params.id)
        // db.collection('allUsers').updateOne({ "match": false } { true })
        // code voor object.match updaten naar true, en deze toe te voegen aan collection likedUsers
    } else if (req.body.dislike) {
        console.log('user disliked');
        res.redirect('/');
        // code voor object.match = false en gebruiker "skippen"
    }
});

app.get('/profile', (req, res) => {
    res.render('profile', data);
});

app.get('/matchlist', (req, res) => {
    res.render('matchlist', data);
    console.log(totalData.liked)
});

app.get('/*', (req, res) => { // 404 page
    res.render('404');
});

// Server aanzetten
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));