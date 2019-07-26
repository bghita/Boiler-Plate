const router = require('express').Router();

const authControllers = require('./../../controllers/authControllers');

router.route('/signup')
    .post((req, res) => {
        console.log("i'm Hit!!!");
        res.send('success')
    });

router.route('/signin')
    .post(authControllers.sighnIn);

module.exports = router;