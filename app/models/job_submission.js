// Schema for Job Submissions (different from Job)

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubmissionSchema = new Schema({
  _id:         { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  author_id:   { type: String, required: true },
  locations: {
    type: [{
      city:    String,
      state:   { type: String, default: '' },
      country: String
    }]
  },
  company: {
    type: {
      _id: String,
      name: String
    }
  },
  URL:        { type: String, required: true },
  commitment: { type: String, default: '' } // Update this later
});

module.exports = mongoose.model('JobSubmission', SubmissionSchema);
