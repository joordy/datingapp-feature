const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 4000;
// const mongo = require('mongodb');

// require('dotenv').config();
// let db = null;
// const uri = process.env.DB_HOST + ':' + process.env.DB_PORT;

// mongo.MongoClient.connect(uri, function(err, client) {
//     if (err) throw err;
//     db = client.db(process.env.DB_NAME);
//     console.log(client)
// })

// Middleware 
// Template setup, en static files ophalen middleware
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));


// user data
let users = [{
        id: 10001,
        name: 'Kayleigh',
        age: 22,
        photo: 'user0001.jpg',
        work: 'Working at Google',
        desc: 'lorem',
        match: true
    }, {
        seen: false,
        id: 10002,
        name: 'Vera',
        age: 21,
        photo: 'user0002.jpg',
        work: 'Student CMD',
        desc: 'lorem',
        match: true
    }, {
        seen: false,
        id: 10003,
        name: 'Isabella',
        age: 18,
        photo: 'user0003.jpg',
        work: 'Student Teacher',
        desc: 'lorem',
        match: true
    }, {
        seen: false,
        id: 10004,
        name: 'Sharon',
        age: 19,
        photo: 'user0004.jpg',
        work: 'Student CMD',
        desc: 'lorme',
        match: false
    }, {
        seen: false,
        id: 10005,
        name: 'Georgina',
        age: 23,
        photo: 'user0005.jpg',
        work: 'Student Math',
        desc: 'melor',
        match: true
    }, {
        seen: false,
        id: 10006,
        name: 'Roos',
        age: 20,
        photo: 'user0006.jpg',
        work: 'Student IT',
        desc: 'merol',
        match: true
    }, {
        seen: false,
        id: 10006,
        name: 'Caroline',
        age: 21,
        photo: 'user0007.jpg',
        work: 'Student IT',
        desc: 'merol',
        match: true
    }
    // , {
    //     seen: false,
    //     id: 10006,
    //     name: 'Charlotte',
    //     age: 21,
    //     photo: 'user0008.jpg',
    //     work: 'Student IT',
    //     desc: 'merol',
    //     match: true
    // }
];

// let totalData = { liked: [], allUsers: [] };
let totalData = { liked: [], users };

// console.log(totalData)
// users.forEach(function(person) {
//     // if (person.seen == false) {
//     //     totalData.allUsers.push(person);
//     // }
//     totalData.allUsers.push(person);

// });

// function createPersonArray() {
//     users.forEach(function(person) {
//         totalData.allUsers.push(person);
//     })
// }

// console.log(totalData.allUsers)

// var json = JSON.stringify(users);
// console.log(json)

// routing of EJS/Handlebars pages
app.get('/', (req, res) => {
    // createPersonArray();
    res.render('index', {
        user: users
    });
});


app.post('/match', (req, res) => {
    // tryout
    // console.log('janus', req.body)
    // createPersonArray();
    if (req.body.like) {
        let x = (totalData.users.length - 1)
        console.log(x);
        totalData.liked.push(totalData.users[x]);
        totalData.users.pop();
        console.log(totalData.users);
        res.render('match', { liked: totalData.liked[0] });

    } else {
        console.log("Er is niet op de like gedrukt");
        // schrijf logic voor de dislike.
    }
    // console.log(totalData.liked)
    // console.log('-------')
    // console.log(totalData.users)
    // console.log(totalData.liked[0].name)


    // totalData['allUsers'].splice(i);
    // i--;


    // // oude code

    // // console.log('janus', req.body)
    // createPersonArray();
    // if (req.body.like) {
    //     totalData.liked.push(totalData.allUsers[0]);
    //     res.render('match', { users: totalData.liked[0] });
    // } else {
    //     // schrijf logic voor de dislike.
    // }
    // console.log(totalData.allUsers)
    //     // console.log(totalData.liked[0].name)


    // // totalData['allUsers'].splice(i);
    // // i--;
});


app.get('/profile', (req, res) => {
    res.render('profile', {
        users: users,
    });
});

app.get('/match', (req, res) => {
    res.render('match');
});

app.get('/matchlist', (req, res) => {
    res.render('matchlist');
});

app.get('/*', (req, res) => {
    res.render('404');
});


// Get input: like button/checkbox and console this in the terminal
// app.post('/', (req, res) => {
//     // if user liked a person, this person gets added to the likedlist
//     if ('likebutton' in req.body) {
//         data['likedPeople'].push(data['persons'][i]);
//     }
//     // remove the (dis)liked person from the 'people (to display)' list
//     data['persons'].splice(i);
//     i--;
// })

// Delete someone from your likedlist
// app.delete('/:id', (req, res) => {
//     let id = req.params.id;

//     data['likedPersons'] = data['likedPersons'].filter(function(value) {
//         return value.id !== id;
//     })
// })

// app.get('/who', test);
// app.post('/swipe', urlencodedParser, posten);

// app.post('/succes', urlEncodedParser, function(req, res) {
//     console.log(req.body);
//     res.send('welcome, ' + req.body.username)
// })

// function test1(req, res) {
//     res.render('test1');
// }

// function test2(req, res) {
//     res.render('test2', {
//         data: req.body
//     });
// };

function notfound(req, res) {
    res.render('404');
}

// Server aanzetten
app.listen(4000, () => console.log(`App is listening on ${PORT}!`));