'use strict';

const express = require('express');
const router  = express.Router();
const Hashids = require('hashids');
const hashids = new Hashids(process.env.jobs_salt, 9, process.env.hashids_alphabet);

// Job mongoose model
const Job = require('../models/Job');

/**
 * GET /api/v1/jobs
 * Get all Jobs
 */
router.get('/jobs', function (req, res) {
  Job.find(function (err, jobs) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/jobs',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all job listings',
        request: 'GET /api/v1/jobs',
        data: jobs
      });
      res.status(200);
    }
  });
});

/**
 * GET /api/v1/jobs/active
 * Get all Jobs that are currently active
 */
router.get('/jobs/active', function (req, res) {
  Job.where('isActive').eq(true).exec(function (err, jobs) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/jobs/active',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all active job listings',
        request: 'GET /api/v1/jobs/active',
        data: jobs
      });
      res.status(200);
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
  job._id = hashids.encode(new Date().getTime());

  job.save(function (err) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'POST /api/v1/jobs',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 201,
        message: 'Successfully created new job listing',
        request: 'POST /api/v1/jobs',
        data: job
      });
      res.status(201);
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/jobs/' + req.params.job_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved job listing',
        request: 'GET /api/v1/jobs/' + req.params.job_id,
        data: job
      });
      res.status(200);
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'PUT /api/v1/jobs/' + req.params.job_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully updated job listing',
        request: 'PUT /api/v1/jobs/' + req.params.job_id,
        data: job
      });
      res.status(200);
    }
  });
});

/**
 * DELETE /api/v1/jobs/:job_id
 * Delete the Job with id = job_id
 */
router.delete('/jobs/:job_id', function (req, res) {
  Job.findByIdAndRemove(req.params.job_id, function (err, job) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'DELETE /api/v1/jobs/' + req.params.job_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 204,
        message: 'Successfully deleted job listing',
        request: 'DELETE /api/v1/jobs/' + req.params.job_id,
        data: job
      });
      res.status(204);
    }
  });
});

module.exports = router;
