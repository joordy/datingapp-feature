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

// database variables
let yourSelf = 99999;
// let allUsers = [];
let db = null;
let usersCollection = null;


// Database aanroepen
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
app.use(session({
    secret: 'maximum',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
}))


// Page routes 
app.get('/', home);
app.get('/profile', profile);
app.get('/matchlist', matchOverview);
app.post('/match', youHaveAnMatch);

// Error route
app.get('/*', errorNotFound);


// removes the first item of database collection (the user)
function deleteYourself(remove_u) {
    let index = remove_u.findIndex(p => p.id === yourSelf);
    completeCollection = remove_u;
    completeCollection.splice(index, 1);
    return completeCollection
}


// Routes functions 
function home(req, res, next) {
    usersCollection.find({ seen: false }).toArray(getData);

    function getData(err, users) {
        let datingUsers = deleteYourself(users)

        // console.log(completeCollection)
        if (err) {
            next(err);
        } else {
            res.render('index.ejs', { users: datingUsers }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }
};


function profile(req, res, next) {
    usersCollection.find({ seen: false }).toArray(done);

    function done(err, users) {
        let datingUsers = deleteYourself(users)

        if (err) {
            next(err);
        } else {
            // console.log(data);
            res.render('profile.ejs', { users: datingUsers }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }
};


function youHaveAnMatch(req, res, next) {
    usersCollection.find({ seen: false }).toArray(check);

    function check(err, users) {
        let datingUsers = deleteYourself(users)

        let x = (completeCollection.length - 1);

        if (req.body.like) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: true, seen: true } })
                // db.collection('datingUsers').updateOne({id: 1}, { $set: { prefGender: req.body.gender, prefMovies: req.body.movies}})


            console.log(`you have a like with ${completeCollection[x].name}, and the ID is ${completeCollection[x]._id}`)
            res.render('match.ejs', { users: datingUsers }) // data uit database halen en printen onder noemer 'users' in EJS templates
        } else if (req.body.dislike) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: false, seen: true } })
            completeCollection.pop();
            console.log(completeCollection)
            res.redirect('/');

        }
    }
};

function matchOverview(req, res, next) {
    usersCollection.find({ match: true }).toArray(matchOrNot);

    function matchOrNot(err, data) {
        if (err) {
            next(err);
        } else {
            console.log('Je matches')
            res.render('matchlist.ejs', { users: data })
        }
    }
}


function errorNotFound(req, res, next) {
    res.status(404).render('404');
}


// Server deploying
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));





// oude code die moet worden hergebruikt:








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



// db.collection('dating-app').findOne({ _id: mongo.ObjectID('jouwMongoID') }, done);
// usersCollection.updateOne(), update

// let id = req.params.id;

// // usersCollection.find().toArray();

// // function checkForMatch(err, data) {
// //     if (err) {
// //         next(err);
// //     } else {
// //         let yourMatches = [];
// //         let inWaitingLine = [];
// //     }
// // }

// if (req.body.like) {
//     // usersCollection.updateOne({ match: false }, { $set: { match: true } })
//     if (data[i].likesYou == true) {
//         console.log('user liked');
//         usersCollection.copyTo('likedUsers')
//         res.render('/match', { data });



//     } else {
//         res.redirect('index.ejs')
//     }
//     // code voor object.match updaten naar true, en deze toe te voegen aan collection likedUsers
// } else if (req.body.dislike) {
//     if {

//     } else {

//     }
//     console.log('user disliked');
//     res.redirect('/');
//     // code voor object.match = false en gebruiker "skippen"
// }