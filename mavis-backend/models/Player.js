var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema({
  name: String,
  ticker: String,
  price: Number,
  sport: String,
  position: String,
  league: String,

});

module.exports = mongoose.model('Player', PlayerSchema); 
// Now `require('Player.js')` will return a mongoose Model,
// without needing to do require('Player.js').Player