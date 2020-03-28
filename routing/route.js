const express = require('express')
const router = express.Router();
// const app = express();

// Home page
router.get('/login', login);

// functions
async function login(req, res, next) {
    // page to identify user
    try {
        res.render('login.ejs')
    } catch (err) {
        console.log(err)
    }
};

module.exports = router;