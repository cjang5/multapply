// Company Model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Schema for Companies
const CompanySchema = new Schema({
  // _id: ObjectId
  name: { type: String, required: true },
  job_ids: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
