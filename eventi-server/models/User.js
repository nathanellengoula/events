const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  phone: {
    type: String,
    default: "111111111",
    min: 9,
    max: 9,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  pic: {
    type: String,
    defaulf: "",
  },
  favourites: {
    type: Array
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userShema)