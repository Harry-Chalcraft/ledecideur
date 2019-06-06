var mongoose = require('mongoose');

var DecisionSchema = mongoose.Schema({
  result: String,
  url: String,
  date: Date,
})

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    token: String,
    salt: String,
    decisions: [DecisionSchema],
   });

module.exports = mongoose.model('users', UserSchema);
