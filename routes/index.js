const router = require('express').Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');

router.use('/', require('./swaggger')); 

router.get('/', indexController.getHome);

router.use('/designers', require('./designerRoute'));

router.use('/collections', require('./collectionsRoutes'));

router.use('/brands', require('./brandsRoute'));

router.use('/shows', require('./showsRoute'));



// GitHub authentication route
router.get('/login', passport.authenticate('github'), (req, res) => {});

// GitHub callback (after successful login)
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Logout route
router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;