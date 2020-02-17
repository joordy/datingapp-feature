const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile('/public/index.html');
});

app.get('/matches', function(req, res) {
    res.sendFile(__dirname + '/public/matches.html')
});

app.get('/matches', function(req, res) {
    res.sendFile(__dirname + '/public/matches.html')
});
app.get('/overview', function(req, res) {
    res.sendFile(__dirname + '/public/overview.html')
});
app.get('/personal', function(req, res) {
    res.sendFile(__dirname + '/public/personalpage.html')
});
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/404.html')
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));