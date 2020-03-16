const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 4000;
const mongo = require('mongodb');
const assert = require('assert');
require("dotenv").config();

// Server aanroepen
let db = null;
// let userid = null;
// let userCollection = null;
let url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL + process.env.DB_END

mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err
    } else if (client) {
        console.log('Connected to database');
    }
    db = client.db(process.env.DB_NAME);

    // You're a user, with a specific ID (009), logged into the app, connected to your own DB collection...
    // allUsersCollection = db.collection("allUsers");
})



// Middleware 
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));


// object with 2 arrays, one for liked, one for all users.
// let totalData = { liked: [], allUsers };



// routing of EJS pages
// app.get('/', (req, res) => {
//     res.render('index', totalData);
// });

app.get('/', (req, res) => {
    db.collection('allUsers').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            // console.log(data);
            res.render('index.ejs', { data: data });
        }
    }
});

app.post('/', (req, res) => {
    if (req.body.like) {
        console.log('user liked')
        console.log(req.params.id)
            // db.collection('allUsers').updateOne({ "match": false } { true })
        res.redirect('/');

        // code voor object.match updaten naar true, en deze toe te voegen aan collection likedUsers
    } else if (req.body.dislike) {
        console.log('user disliked')
        res.redirect('/');

        // code voor object.match = false en gebruiker "skippen"
    }
    // if (req.body.like) {
    //     let x = (totalData.allUsers.length - 1);
    //     // console.log(x);
    //     totalData.liked.push(totalData.allUsers[x]);
    //     totalData.allUsers.pop();
    //     // console.log(totalData.users);
    //     let z = (totalData.liked.length - 1);
    //     res.render('match', { liked: totalData.liked[z] });
    //     console.log("Er is op de like    gedrukt");
    // } else if (req.body.dislike) {
    //     let x = (totalData.allUsers.length - 1);
    //     totalData.allUsers.pop();
    //     res.redirect('/');
    //     // schrijf logic voor de dislike.
    //     console.log("Er is niet op de like gedrukt");
    // }
});

app.get('/profile', (req, res) => {
    res.render('profile', data);
});

// app.get('/match', (req, res) => {
//     res.render('match');
// });

app.get('/matchlist', (req, res) => {
    res.render('matchlist', data);
    console.log(totalData.liked)
});

app.get('/*', (req, res) => {
    res.render('404');
});

// Server aanzetten
app.listen(4000, () => console.log(`App is listening on ${PORT}!`));