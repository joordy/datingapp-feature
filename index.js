const express = require('express')
const app = express()
const port = 5500


app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.send('/static/about.html')
})

// Definieer in debug console op welke poort je zit
app.listen(port, () => console.log(`Example app listening on port ${port}!`))