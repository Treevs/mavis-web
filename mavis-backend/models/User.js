const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Player = mongoose.model('Player');


const { Schema } = mongoose;

const PortfolioSchema = new Schema({ticker: String, purchasePrice: Number, numberOfShares: Number})
const UserSchema = new Schema({
    email: {type: String},
    hash: {type: String},
    salt: {type: String},
    buyingPower: {type: Number, default: 100000000},
    portfolio: [PortfolioSchema]
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');

};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime()/1000, 10),
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

UserSchema.methods.getBuyingPower = function() {
    return {
        buyingPower: this.buyingPower
    }
}
UserSchema.methods.getBuyingPowerString = function() {
    var buyingPowerString = (this.buyingPower/10000).toFixed(2);
    return buyingPowerString;
}

UserSchema.methods.buyShares = function(ticker, numberOfShares) {
    var portfolio = this.portfolio;
    //Get purchase price
    Player.findOne({ticker: ticker})
        .then((player) => {
            var totalCost = player.price*numberOfShares;
            if (totalCost>this.buyingPower) {
                //Throw error
            } else {

                portfolio.push({
                    ticker: ticker,
                    numberOfShares: numberOfShares,
                    purchasePrice: player.price
                });
                this.portfolio = portfolio;
                this.buyingPower -= totalCost;
                console.log(this.portfolio);
                this.save()
            }
            
        }).catch(function (error) {
            // handle error
            console.log("error")
            console.log(error)
          });
    
}

UserSchema.methods.getPrettyPortfolio = function() {
    var prettyPortfolio = this.portfolio;
    //Group based on same stock
    
    //Get current price
    // prettyPortfolio.forEach(function(element, index) {
    //     Player.findOne({ticker: prettyPortfolio[index].ticker})
    //         .then((player) => {
    //             prettyPortfolio[index].prettyPrice = player.price;
    //             console.log(prettyPortfolio)
    //             return prettyPortfolio;
    //         }).catch(function (error) {
    //             // handle error
    //             console.log("error")
    //             console.log(error)
    //           });
    // })
    return prettyPortfolio;
}
module.exports = mongoose.model('User', UserSchema); //Tutorial didn't have "module.exports = "