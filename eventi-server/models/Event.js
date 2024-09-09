const mongoose = require('mongoose');

const eventShema = new mongoose.Schema({
  author: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Array
  },
  flyer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    min: 9,
    max: 9,
  },
  address: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Event', eventShema)