const express = require('express');
const app = express();
const PORT = 3000;

// Template setup
app.set('view engine', 'ejs');

// Bestanden ophalen
app.use(express.static('public'));


// Routes uitwerken
app.get('/', function(req, res) {
    // query in console loggen.
    console.log(req.query)
    res.sendFile('/public/index.html');
});
app.get('/matches', function(req, res) {
    console.log(req.query)
    res.sendFile(__dirname + '/public/matches.html');
});
app.get('/overview', function(req, res) {
    console.log(req.query)
    res.sendFile(__dirname + '/public/overview.html');
});
app.get('/personal', function(req, res) {
    res.sendFile(__dirname + '/public/personalpage.html', { qs: req.query });
});
// query string ontvangen in browser handmatig
// app.get('/profile/:name', function(req, res) {
//     res.send('You requested to see a profile with the name of ' + req.params.name);
// });
//
app.get('/test/:name', function(req, res) {
    // insert data from database (in this case, from object)
    let data = { age: 22, job: 'Student', hobby: ['Eating', 'Drawing', 'Shopping'] };
    // render everything in EJS.
    res.render('test', { person: req.params.name, data: data });
});

// 404 page
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/404.html');
});

// Server aanzetten
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));