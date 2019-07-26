const router = require('express').Router();
const authControllers = require('./../../controllers/authControllers');
const authMiddleware = require('./../../middlewares/authMiddlewares');
const passportService = require('./../../services/passport')

router.route('/signup')
    .post(authControllers.signUp);

router.route('/signin')
    .post(authMiddleware.requireSignIn, authControllers.signIn);

module.exports = router;