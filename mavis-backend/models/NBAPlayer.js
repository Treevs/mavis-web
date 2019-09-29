var mongoose = require("mongoose");

var NBAPlayerSchema = new mongoose.Schema({
  name: String,
  ticker: String,
  price: Number,
  position: String,
  team: String

});

module.exports = mongoose.model('NBAPlayer', NBAPlayerSchema); 
// Now `require('NBAPlayer.js')` will return a mongoose Model,
// without needing to do require('NBAPlayer.js').NBAPlayer