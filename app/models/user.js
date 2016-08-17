// User Model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  _id:       { type: String, required: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  username:  { type: String, required: true },
  email:     { type: String, required: true },
  application_ids: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
