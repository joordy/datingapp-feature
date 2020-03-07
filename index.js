const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let matches = [{
        id: 1,
        name: 'Lisanne',
        age: '22'
    },
    {
        id: 2,
        name: 'Elisa',
        age: '21'
    },
    {
        id: 3,
        name: 'Fabienne',
        age: '23'
    }
];

// Template setup, en static files ophalen middleware. Volgorde maakt uit!! Voor EJS
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');

// pakt Static files op wanneer nodig.
app.use(express.static('static'));

// routing of EJS/Handlebars pages
app.get('/', home);
app.get('/profile', profile);
app.get('/match', match);
app.get('/matchlist', matchlist);
app.get('/matchlist-empty', matchListEmpty);
app.get('/who', test);
app.post('/swipe', urlencodedParser, posten);
app.get('/*', notfound);

// functions for routing
function home(req, res) {
    res.render('index');
}

function match(req, res) {
    res.render('match');
}

function matchlist(req, res) {
    res.render('matchlist',
        // {
        //  matches: req.body
        //}
    );
};

function matchListEmpty(req, res) {
    res.render('matchlist-empty');
}

function profile(req, res) {
    res.render('profile');
}

function test(req, res) {
    res.render('test');
}

function posten(req, res) {
    res.render('swipe', {
        data: req.body
    });
};
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
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));