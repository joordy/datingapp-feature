const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
// require('dotenv').config()

// Template setup, en static files ophalen middleware. Volgorde maakt uit!! Voor EJS
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');

// pakt Static files op wanneer nodig.
app.use(express.static('static'));

// user data
let users = [{
    id: 0001,
    name: 'Kayleigh',
    age: 22,
    photo: 'user0001.jpg',
    work: 'Working at Google',
    desc: 'lorem',
    match: true
}, {
    id: 0002,
    name: 'Vera',
    age: 21,
    photo: 'user0002.jpg',
    work: 'Student CMD',
    desc: 'lorem',
    match: true
}, {
    id: 0003,
    name: 'Isabella',
    age: 21,
    photo: 'user0003.jpg',
    work: 'Student Teacher',
    desc: 'lorem',
    match: true
}, {
    id: 0004,
    name: 'Sharon',
    age: 22,
    photo: 'user0004.jpg',
    work: 'Student CMD',
    desc: 'lorme',
    match: false
}, {
    id: 0005,
    name: 'Georgina',
    age: 22,
    photo: 'user0005.jpg',
    work: 'Student Math',
    desc: 'melor',
    match: true
}, {
    id: 0006,
    name: 'Roos',
    age: 22,
    photo: 'user0006.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    id: 0006,
    name: 'Caroline',
    age: 22,
    photo: 'user0007.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    id: 0006,
    name: 'Charlotte',
    age: 22,
    photo: 'user0008.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    id: 0006,
    name: 'Alicia',
    age: 22,
    photo: 'user0009.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}];

let totalData = { liked: [], allUsers: [] };

users.forEach(function(person) {
    totalData.allUsers.push(person);
});

console.log(totalData.allUsers);

// console.log(gebruiker)

// let Kayleigh = new users('000', 'Kayleigh', '22', 'user0018.jpg', `Working at Google`, `lorem`, true)
// let Vera = new users('0001', 'Vera', '24', 'user0002.jpg', `Student`, `lorem`, false)
// let Isabelle = new users('0001', 'Isabelle', '19', 'user0003.jpg', `Student`, `lorem`, true)
// let Sharon = new users('0001', 'Sharon', '18', 'user0004.jpg', `Student`, `lorem`, false)
// let Georgina = new users('0001', 'Georgina', '20', 'user0005.jpg', `Student`, `lorem`, true)
// let Roos = new users('0001', 'Roos', '22', 'user0006.jpg', `Working at Lidl`, `lorem`, true)
// let Caroline = new users('0001', 'Caroline', '21', 'user0007.jpg', `Student`, `lorem`, true)
// let Charlotte = new users('0001', 'Charlotte', '20', 'user0008.jpg', `Student`, `lorem`, false)
// let Alicia = new users('0001', 'Alicia', '19', 'user0009.jpg', `Student`, `lorem`, true)
// let Eva = new users('0001', 'Eva', '18', 'user0010.jpg', `Student`, `lorem`, false)
// let Annabel = new users('0001', 'Annabel', '18', 'user0011.jpg', `Student`, `lorem`, false)
// let Linda = new users('0001', 'Linda', '21', 'user0012.jpg', `Student`, `lorem`, true)
// let Stacey = new users('0001', 'Stacey', '22', 'user0013.jpg', `Student`, `lorem`, true)
// let Anne = new users('0001', 'Anne', '23', 'user0014.jpg', `Student`, `lorem`, true)
// let Ella = new users('0001', 'Ella', '23', 'user0015.jpg', `Student`, `lorem`, false)
// let Laura = new users('0001', 'Laura', '21', 'user0016.jpg', `Student`, `lorem`, true)
// let Amy = new users('0001', 'Amy', '21', 'user0017.jpg', `Student`, `lorem`, false)


// const data = {
//     likedPersons: [],
//     persons: [Kayleigh, Vera, Isabelle, Sharon, Georgina, Roos, Caroline, Charlotte, Alicia, Eva, Annabel, Linda, Stacey, Anne, Ella, Laura, Amy]
// }

// let i = data['persons'].length - 1;

// routing of EJS/Handlebars pages
app.get('/', (req, res) => {
    res.render('index', {
        users: users
    });
});
app.get('/profile', (req, res) => {
    res.render('profile', {
        users: users
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
app.listen(3000, () => console.log(`App is listening on ${PORT}!`));