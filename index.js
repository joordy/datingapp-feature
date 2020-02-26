const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let urlEncodedParser = bodyParser.urlencoded({ extended: false })


// Template setup
app.set('view engine', 'ejs');
// Static file ophalen
app.use(express.static('static'));

// Routes Dynamic
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/matches', function(req, res) {
    res.render('matches');
});
app.get('/matchlist', function(req, res) {
    res.render('matchlist');
});
app.get('/profile', function(req, res) {
    res.render('profile', { qs: req.query });
});
// post method to succes page
app.post('/profile', urlEncodedParser, function(req, res) {
    console.log(req.body);
    res.render('profile-succes', { data: req.body });
});
//
app.get('/test/:name', function(req, res) {
    // insert data from database( in this case, from object)
    let data = { age: 22, job: 'Student', hobby: ['Eating', 'Drawing', 'Shopping'] };
    // render everything in EJS.
    res.render('test', { person: req.params.name, data: data });
});

app.get('/*', function(req, res) {
    res.render('404');
});

// Server aanzetten
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));