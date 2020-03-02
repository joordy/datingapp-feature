const express = require('express');
const app = express();
const PORT = 3000;
// const bodyParser = require('body-parser');
// let urlEncodedParser = bodyParser.urlencoded({ extended: false })

// view engine
app.set('views', 'view-pug');
app.set('view engine', 'pug');

// pakt Static files op wanneer nodig.
app.use(express.static('static'));

// routing of Pug-templating pages
app.get('/', home);
app.get('/match', match);
app.get('/profile', profile);
app.get('/matchlist', matchlist);
app.get('/matchlist-empty', matchListEmpty);
// app.post('/profile', urlEncodedParser, profilePost);
app.get('/*', notfound);

// functions for routing
function home(req, res) {
    res.render('index', {
        title: 'Overzicht'
    });
}

function profile(req, res) {
    res.render('profile', {
        title: 'Profiel van gebruiker'
    });
}

function match(req, res) {
    res.render('match', {
        title: 'Je hebt een match!'
    });
}

function matchlist(req, res) {
    res.render('matchlist', {
        title: 'Match overzicht'
    });
}

function matchListEmpty(req, res) {
    res.render('matchlist-empty', {
        pagetitleitle: 'Match overzicht'
    });
}

// function profilePost(req, res) {
//     console.log(req.body);
//     res.render('profile-succes', { data: req.body });
// };

function notfound(req, res) {
    res.render('error');
}

// Server aanzetten
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));