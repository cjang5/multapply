'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Hashids = require('hashids');
const hashids = new Hashids(process.env.submissions_salt, 9, process.env.hashids_alphabet);

// Job Submissions model
const Submission = require('../models/job_submission');

/**
 * GET /api/v1/submissions
 * Get all job Submissions
 */
router.get('/submissions', function (req, res) {
  Submission.find(function (err, submissions) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/submissions',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all job submissions',
        request: 'GET /api/v1/submissions',
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
  submission._id = hashids.encode(new Date().getTime());

  submission.save(function (err) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'POST /api/v1/submissions',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 201,
        message: 'Successfully created new job submission',
        request: 'POST /api/v1/submissions',
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/submissions/' + req.params.submission_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved job submission',
        request: 'GET /api/v1/submissions/' + req.params.submission_id,
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'PUT /api/v1/submissions/' + req.params.submission_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully updated job submission',
        request: 'PUT /api/v1/submissions/' + req.params.submission_id,
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
  Submission.findByIdAndRemove(req.params.submission_id, function (err, submission) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'DELETE /api/v1/submissions/' + req.params.submission_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 204,
        message: 'Successfully deleted job submission',
        request: 'DELETE /api/v1/submissions/' + req.params.submission_id,
        data: submission
      });
    }
  });
});

module.exports = router;
