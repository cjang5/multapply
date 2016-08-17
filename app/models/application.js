// Application Model (Job Applications)
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Application Schema
const ApplicationSchema = new Schema({
  _id:          { type: String, required: true },
  applicant_id: { type: String, required: true },
  job_id:       { type: String, required: true },
  status: {
    type: String,
    default: 'applied', // 'applied, 'accepted', 'offered', 'rejected'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
