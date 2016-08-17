const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CountSchema = new Schema({
  alphabet: String,
  jobs: Number,
  jobs_salt: String,
  companies: Number,
  companies_salt: String,
  users: Number,
  users_salt: String,
  applications: Number,
  applications_salt: String
});

module.exports = mongoose.model('Counts', CountSchema);
