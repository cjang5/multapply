// Job Model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Schema for Jobs
const JobSchema = new Schema({
  _id: { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  locations: {
    type: [{
      city:    String,
      state:   { type: String, default: '' },
      country: String
    }],
    required:  true
  },
  author_id: { type: String, required: true },
  application_ids: {
    type: [String],
    default: []
  },
  company_id: { type: String, required: true },
  views:      { type: Number, default: 0 }, // Unique Views
  iconPath:   { type: String, required: true },
  headerPath: { type: String, required: true },
  URL:        { type: String, required: true },
  isActive:   { type: Boolean, default: true },
  commitment: {
    type: {
      isFulltime: { type: Boolean, default: false },
      season:     { type: String, default: '' },
      year:       { type: Number, default: '' },
      isPaid:     { type: Boolean, default: true }
    },
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
