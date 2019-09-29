const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/buy', auth.required, (req, res, next) => {
    const { body: { user, ticker, shares } } = req;

    //Edge cases 
    if(!shares || shares <= 0 ) {
        return res.status(422).json({
            errors: {
                shares: 'must be greater than 0',
            },
        });
    }

    if(!ticker) {
        return res.status(422).json({
            errors: {
                ticker: 'is required',
            },
        });
    }

    //TODO: Get player info (mostly price)
    var playerQuery = User.findOne({'email': user.email}, function(err, data) {

        if(err) {
            //handle error
        } else {
            //TOOD: Execute a buy
            var buyQuery = User.findOne({'email': user.email}, function(err, data) {

            })
        }
    })
    
});


module.exports = router;