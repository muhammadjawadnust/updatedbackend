const mongoose = require('mongoose');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
    
  },
  password: {
    type: String,
    required: [true, 'Please enter a Password'],
    minlength: [8, 'minimum length of password is atleast 8 characters']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
