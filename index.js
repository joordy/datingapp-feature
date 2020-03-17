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
let yourSelf = 1;
let allUsers = [];
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


// // Functie voor jezelf in de database te verstoppen
// function probeersel(req, res, next) {
//     usersCollection.find().toArray(removeYourself); // collectie omzetten in array

//     function removeYourself(err, users) {
//         let index = users.findIndex(p => p.id === yourSelf);
//         completeCollection = users;
//         completeCollection.splice(index, 1);
//         // console.log('hallo')
//     };
// }
// // object with 2 arrays, one for liked, one for all users.
// var test = function maakArray(err, users) {
//     usersCollection.find().toArray(getData); // collectie omzetten in array

//     // console.log('test')
//     let index = users.findIndex(p => p.id === yourSelf);
//     allUsers = users;
//     allUsers.splice(index, 1);
// }


// Routes functions 
function home(req, res, next) {
    usersCollection.find({ seen: false }).toArray(getData);

    // a()

    function getData(err, users) {
        let index = users.findIndex(p => p.id === yourSelf);
        completeCollection = users;
        completeCollection.splice(index, 1);


        if (err) {
            next(err);
        } else {
            res.render('index.ejs', { users: users }); // data uit database halen en printen onder noemer 'users' in EJS templates

        }
    }
};


// let totalData = { likedUsers: [], allUsers }
// console.log(allUsers)

// test() // code function to remove yourself out of array

function profile(req, res, next) {
    usersCollection.find({ match: false }).toArray(done);

    function done(err, users) {
        // codeblock to remove yourself out of array
        let index = users.findIndex(p => p.id === yourSelf);
        completeCollection = users;
        completeCollection.splice(index, 1);

        if (err) {
            next(err);
        } else {
            // console.log(data);
            res.render('profile.ejs', { users: users }); // data uit database halen en printen onder noemer 'users' in EJS templates
        }
    }
};



function youHaveAnMatch(req, res, next) {
    usersCollection.find({ seen: false }).toArray(check);

    function check(err, users) {
        // codeblock to remove yourself out of array
        let index = users.findIndex(p => p.id === yourSelf);
        completeCollection = users;
        completeCollection.splice(index, 1);
        // console.log(allUsers)

        let x = (completeCollection.length - 1);


        if (req.body.like) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: true } })

            console.log(`you have a like with ${completeCollection[x].name}, and the ID is ${completeCollection[x]._id}`)
            res.render('match.ejs', { users: users }) // data uit database halen en printen onder noemer 'users' in EJS templates
        } else if (req.body.dislike) {
            usersCollection.updateOne({ _id: (completeCollection[x]._id) }, { $set: { match: false } })
                // totalData.allUsers.pop();
                // console.log(totalData.allUsers)
                // res.redirect('/');
                // console.log('dislike')
        }
    }
};

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


function matchOverview(req, res, next) {
    // usersCollection.find().toArray(matchOrNot); // collectie omzetten in array
    // usersCollection.find({}), matchOrNot);
    usersCollection.find({ match: true }).toArray(matchOrNot);
    // , "ratedBy": { $nin: [userid]}
    // ({_id: mongo.ObjectID('jouwMongoID')


    function matchOrNot(err, data) {
        if (err) {
            next(err);
        } else {
            console.log('Je matches')
            res.render('matchlist.ejs', { users: data })
        }
    }

    // res.render('matchlist', data);
    // console.log(totalData.liked)
    // usersCollection.find().toArray(getData);

    // function getData(err, data) {
    //     console.log(data);
    // }
}


function errorNotFound(req, res, next) {
    res.status(404).render('404');
}


// Server deploying
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));


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