'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.mongo.ObjectId;

// Job Submissions model
const Submission = require('../models/job_submission');

/**
 * GET /api/v1/submissions
 * Get all job Submissions
 */
router.get('/submissions', function (req, res) {
  Submission.find(function (err, submissions) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      res.json({
        status: 'success',
        status_code: 200,
        data: submissions
      });
    }
  });
});

/**
 * POST /api/v1/submissions
 * Create a new job Submission
 */
router.post('/submissions', function (req, res) {
  let submission = new Submission(req.body);

  submission.save(function (err) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      res.json({
        status: 'success',
        status_code: 200,
        data: submission
      });
    }
  });
});

/**
 * GET /api/v1/submissions/:submission_id
 * Get a single Submission with id = submission_id
 */
router.get('/submissions/:submission_id', function (req, res) {
  Submission.findById(req.params.submission_id, function (err, submission) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      res.json({
        status: 'success',
        status_code: 200,
        data: submission
      });
    }
  });
});

/**
 * PUT /api/v1/submissions/:submission_id
 * Update job Submission with id = submission_id
 */
router.put('/submissions/:submission_id', function (req, res) {
  Submission.findOneAndUpdate(req.params.submission_id, { $set: req.body }, { new: true }, function (err, submission) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      res.json({
        status: 'success',
        status_code: 200,
        data: submission
      });
    }
  });
});

/**
 * DELETE /api/v1/submissions/:submission_id
 * Delete Submission with id = submission_id
 */
router.delete('/submissions/:submission_id', function (req, res) {
  Submission.remove({ _id: req.params.submission_id }, function (err, submission) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      res.json({
        status: 'success',
        status_code: 200,
        data: submission
      });
    }
  });
});

module.exports = router;
