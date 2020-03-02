const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let urlEncodedParser = bodyParser.urlencoded({ extended: false })

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
app.get('/test', test);

app.post('/profile', urlEncodedParser, profilePost);
app.get('/*', notfound);

// functions for routing
function home(req, res) {
    res.render('index');
}

function match(req, res) {
    res.render('match');
}

function matchlist(req, res) {
    res.render('matchlist');
}

function matchListEmpty(req, res) {
    res.render('matchlist-empty');
}

function profile(req, res) {
    res.render('profile');
}

function test(req, res) {
    res.render('test');
}

function profilePost(req, res) {
    console.log(req.body);
    res.render('profile-succes', { data: req.body });
};

function notfound(req, res) {
    res.render('404');
}

// Routes Dynamic
// app.get('/', function(req, res) {
//     res.render('index');
// });
// app.get('/matches', function(req, res) {
//     res.render('matches');
// });
// app.get('/matchlist', function(req, res) {
//     res.render('matchlist');
// });
// app.get('/profile', function(req, res) {
//     res.render('profile', { qs: req.query });
// });
// // post method to succes page
// app.post('/profile', urlEncodedParser, function(req, res) {
//     console.log(req.body);
//     res.render('profile-succes', { data: req.body });
// });

// app.get('/test/:name', function(req, res) {
//     // insert data from database( in this case, from object)
//     let data = { age: 22, job: 'Student', hobby: ['Eating', 'Drawing', 'Shopping'] };
//     // render everything in EJS.
//     res.render('test', { person: req.params.name, data: data });
// });
// app.get('/*', function(req, res) {
//     res.render('404');
// });

// Server aanzetten
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));