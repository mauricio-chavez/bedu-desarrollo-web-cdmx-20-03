const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: String,
  },
  firstName: {
    type: String,
    required: String,
  },
  lastName: {
    type: String,
    required: String,
  },
});

module.exports = mongoose.model('Users', userSchema);
