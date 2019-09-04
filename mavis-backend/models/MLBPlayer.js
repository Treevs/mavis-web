var mongoose = require("mongoose");

var MLBPlayerSchema = new mongoose.Schema({
  name: String,
  ticker: String,
  price: Number,
  position: String,
  team: String

});

module.exports = mongoose.model('MLBPlayer', MLBPlayerSchema); 
// Now `require('MLBPlayer.js')` will return a mongoose Model,
// without needing to do require('MLBPlayer.js').MLBPlayer