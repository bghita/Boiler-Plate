const router = require('express').Router();

const authControllers = require('./../../controllers/authControllers');

router.route('/signup')
    .post((req, res) => {
        console.log("i'm Hit!!!");
        res.send('success')
    });

module.exports = router;