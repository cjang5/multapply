'use strict';

const express = require('express');
const router  = express.Router();

// Job mongoose model
const Job = require('../models/Job');

/**
 * GET /api/v1/jobs
 * Get all Jobs
 */
router.get('/jobs', function (req, res) {
  Job.find(function (err, jobs) {
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
        data: jobs
      });
    }
  });
});

/**
 * GET /api/v1/jobs/active
 * Get all Jobs that are currently active
 */
router.get('/jobs/active', function (req, res) {
  Job.where('status').eq('active').exec(function (err, jobs) {
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
        data: jobs
      });
    }
  });
});

/**
 * POST /api/v1/jobs
 * Create a new Job
 * Defaults the job's 'status' to 'active'
 */
router.post('/jobs', function (req, res) {
  let job = new Job(req.body);

  job.save(function (err) {
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
        data: job
      });
    }
  });
});

/**
 * GET /api/v1/jobs/:job_id
 * Get a Job with id = job_id
 */
router.get('/jobs/:job_id', function (req, res) {
  Job.findById(req.params.job_id, function (err, job) {
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
        data: job
      });
    }
  });
});

/**
 * PUT /api/v1/jobs/:job_id
 * Update the Job with id = job_id
 */
router.put('/jobs/:job_id', function (req, res) {
  Job.findOneAndUpdate(req.params.job_id, { $set: req.body }, { new: true }, function (err, job) {
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
        data: job
      });
    }
  });
});

/**
 * DELETE /api/v1/jobs/:job_id
 * Delete the Job with id = job_id
 */
router.delete('/jobs/:job_id', function (req, res) {
  Job.remove({ _id: req.params.job_id }, function (err, job) {
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
        data: job
      });
    }
  });
});

module.exports = router;
