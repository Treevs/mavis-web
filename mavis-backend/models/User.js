const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Player = mongoose.model('Player');

const MODIFIER = 100; 
const PRICE_FLOOR = 100000; 

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
            var intShares = parseInt(numberOfShares)
            player.price = player.price + (MODIFIER*numberOfShares);
            player.save();
            var totalCost = player.price*numberOfShares;
            if (totalCost>this.buyingPower) {
                //Throw error
                //TODO: Move this earlier
            } else {
                var addStockToPortolio = true;

                portfolio.forEach(element => {
                    if(element.ticker == ticker) {
                        addStockToPortolio = false;
                        element.numberOfShares = element.numberOfShares + intShares
                        this.portfolio = portfolio;
                        this.buyingPower -= totalCost;
                        //Be nice if they went over budget due to price increasing. 
                        if(this.buyingPower < 0) {
                            this.buyingPower = 0;
                        }
                        console.log(this.portfolio);
                        this.save()
                        return; 
                    }
                });
                if(addStockToPortolio)  {
                    //No shares of this held
                    portfolio.push({
                        ticker: ticker,
                        numberOfShares: numberOfShares,
                        purchasePrice: player.price
                    });
                    this.portfolio = portfolio;
                    this.buyingPower -= totalCost;
                    //Be nice if they went over budget due to price increasing. 
                    if(this.buyingPower < 0) {
                        this.buyingPower = 0;
                    }
                    console.log(this.portfolio);
                    this.save()
                }
            }
            
        }).catch(function (error) {
            // handle error
            console.log("error")
            console.log(error)
          });
    
}

UserSchema.methods.sellShares = function(ticker, numberOfShares) {
    var portfolio = this.portfolio;
    var totalReturn = 0;
    //Get purchase price
    Player.findOne({ticker: ticker})
        .then((player) => {
            var intShares = parseInt(numberOfShares)
            portfolio.forEach((element, index) => {
                if(element.ticker == ticker) {
                    if(element.numberOfShares <= intShares) {
                        //Selling more shares than exist in portfolio
                        intShares = intShares - element.numberOfShares;
                        //Modify player price
                        player.price = Math.max(player.price - (MODIFIER*element.numberOfShares), PRICE_FLOOR);
                        //Add to total return after modifying the price
                        totalReturn += player.price*element.numberOfShares;
                        portfolio.splice(index, 1)
                        element.numberOfShares = 0;
                    } else {
                        //Selling less shares than exist in portfolio
                        element.numberOfShares = element.numberOfShares - intShares;
                        //Modify player price
                        player.price = Math.max(player.price - (MODIFIER*intShares), PRICE_FLOOR);
                        //Add to total return after modifying the price
                        totalReturn += player.price*intShares;
                        intShares = 0;
                    }
                }
                
            });
            player.save();
            this.portfolio = portfolio;
            this.buyingPower += totalReturn;
            // console.log(this.portfolio);
            this.save()
            return; 
            
        }).catch(function (error) {
            // handle error
            console.log("error")
            console.log(error)
          });
    
}

UserSchema.methods.getPrettyPortfolio = function() {
    var prettyPortfolio = this.portfolio;

    //TODO verify if this is needed
    return prettyPortfolio;
}
module.exports = mongoose.model('User', UserSchema); //Tutorial didn't have "module.exports = "