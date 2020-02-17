const express = require('express');
const app = express();
const http = require('http');

app.use(express.static('public'));

http.createServer(onRequest).listen()
app.get('req.url', function(req, res)) {
    if (req.url === '/') {
        res.sendFile('/public/index.html');
    } else if (req.url === '/matches') {
        res.sendFile(__dirname + '/public/matches.html')
    } else if (req.url === '/overview') {
        res.sendFile(__dirname + '/public/overview.html')
    } else if (req.url === '/personal') {
        res.sendFile(__dirname + '/public/personal.html')
    } else if (req.url === '/*') {
        res.sendFile(__dirname + '/public/404.html')
    }
}



// // app.get('/', function(req, res) {
// //     res.sendFile('/public/index.html');
// // });

// app.get('/matches', function(req, res) {
//     res.sendFile(__dirname + '/public/matches.html')
// });
// app.get('/overview', function(req, res) {
//     res.sendFile(__dirname + '/public/overview.html')
// });
// app.get('/personal', function(req, res) {
//     res.sendFile(__dirname + '/public/personalpage.html')
// });
// app.get('/*', function(req, res) {
//     res.sendFile(__dirname + '/public/404.html')
// });

// app.listen(3000, () => console.log('App is listening on port 3000!'));