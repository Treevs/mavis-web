const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    var userQuery = User.findOne({'email': user.email}, function(err, data) {

        if(err) {
            //handle error
        } if(data != null) {
            return res.status(422).json({
                errors: {
                    email: 'already exists',
                },
            });
        } else {        
            // console.log(data)
            const finalUser = new User(user);
            
            finalUser.setPassword(user.password);
            
            return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
        }
    })
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON(), buyingPower: user.getBuyingPowerString() });
        }

        return status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id} } = req;

    return User.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }
            
            return res.json({ user: user.toAuthJSON(), buyingPower: user.getBuyingPowerString()});
        })
})

//GET portfolio object
router.get('/portfolio', auth.required, (req, res, next) => {
    const{ body: {user}, payload: { id} } = req;
    return User.findById(id)
        .then((user) =>{
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({portfolio: user.getPrettyPortfolio()});
        })
})

module.exports = router;