'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Hashids  = require('hashids');
const hashids  = new Hashids(process.env.applications_salt, 9, process.env.hashids_alphabet);

// Application Model
const Application = require('../models/application');

/**
 * GET /api/v1/applications
 * Get all Job Applications
 */
router.get('/applications', function (req, res) {
  Application.find(function (err, applications) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/applications',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all job applications',
        request: 'GET /api/v1/applications',
        data: applications
      });
      res.status(200);
    }
  });
});

/**
 * POST /api/v1/applications
 * Create a new Job Application
 */
router.post('/applications', function (req, res) {
  let application = new Application(req.body);
  application._id = hashids.encode(new Date().getTime());

  application.save(function (err) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'POST /api/v1/applications',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 201,
        message: 'Successfully created new job application',
        request: 'POST /api/v1/applications',
        data: application
      });
      res.status(201);
    }
  });
});

/**
 * GET /api/v1/applications/:application_id
 * Get the Job Application with id 'application_id'
 */
router.get('/applications/:application_id', function (req, res) {
  Application.findById(req.params.application_id, function (err, application) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/applications/' + req.params.application_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved job application',
        request: 'GET /api/v1/applications/' + req.params.application_id,
        data: application
      });
      res.status(200);
    }
  });
});

/**
 * PUT /api/v1/applications/:application_id
 * Update Job Application with id 'application_id'
 */
router.put('/applications/:application_id', function (req, res) {
  Application.findOneAndUpdate(req.params.application_id, { $set: req.body }, { new: true }, function (err, application) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'PUT /api/v1/applications/' + req.params.application_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully updated job application',
        request: 'PUT /api/v1/applications/' + req.params.application_id,
        data: application
      });
      res.status(200);
    }
  });
});

/**
 * DELETE /api/v1/applications/:application_id
 * Delete Job Application with id 'application_id'
 */
router.delete('/applications/:application_id', function (req, res) {
  Application.findByIdAndRemove(req.params.application_id, function (err, application) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'DELETE /api/v1/applications/' + req.params.application_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 204,
        message: 'Successfully deleted job application',
        request: 'DELETE /api/v1/application/' + req.params.application_id,
        data: application
      });
      res.status(204);
    }
  });
});

/**
 * GET /api/v1/applications/:application_id/status
 * Get the application status of Application with id 'application_id'
 */
router.get('/applications/:application_id/status', function (req, res) {
  Application.findById(req.params.application_id, function (err, application) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/applications/' + req.params.application_id + '/status',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved job application status',
        request: 'GET /api/v1/applications/' + req.params.application_id + '/status',
        data: application.status
      });
      res.status(200);
    }
  });
});

// Series of functions to change the status of an Application
// Different POST requests to different routes will change the status
/**
 * POST /api/v1/applications/:application_id/status/applied
 * Set the status for Application with id 'application_id' to 'applied'
 */
router.post('/applications/:application_id/status/applied', function (req, res) {
  Application.findByIdAndUpdate(
    req.params.application_id,
    { $set: { status: 'applied' } },
    { new: true },
    function (err, application) {
      if (err) {
        res.json({
          status: 'BAD REQUEST',
          status_code: 400,
          message: 'Request could not be completed',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/applied',
          data: err
        });
        res.status(400);
      } else {
        res.json({
          status: 'OK',
          status_code: 200,
          message: 'Successfully updated job application status to \'applied\'',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/applied',
          data: application
        });
        res.status(200);
      }
    }
  );
});

/**
 * POST /api/v1/applications/:application_id/status/accepted
 * Set the status for Application with id 'application_id' to 'accepted'
 */
router.post('/applications/:application_id/status/accepted', function (req, res) {
  Application.findByIdAndUpdate(
    req.params.application_id,
    { $set: { status: 'accepted' } },
    { new: true },
    function (err, application) {
      if (err) {
        res.json({
          status: 'BAD REQUEST',
          status_code: 400,
          message: 'Request could not be completed',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/accepted',
          data: err
        });
        res.status(400);
      } else {
        res.json({
          status: 'OK',
          status_code: 200,
          message: 'Successfully updated job application status to \'accepted\'',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/accepted',
          data: application
        });
        res.status(200);
      }
    }
  );
});

/**
 * POST /api/v1/applications/:application_id/status/offered
 * Set the status for Application with id 'application_id' to 'offered'
 */
router.post('/applications/:application_id/status/offered', function (req, res) {
  Application.findByIdAndUpdate(
    req.params.application_id,
    { $set: { status: 'offered' } },
    { new: true },
    function (err, application) {
      if (err) {
        res.json({
          status: 'BAD REQUEST',
          status_code: 400,
          message: 'Request could not be completed',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/offered',
          data: err
        });
        res.status(400);
      } else {
        res.json({
          status: 'OK',
          status_code: 200,
          message: 'Successfully updated job application status to \'offered\'',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/offered',
          data: application
        });
        res.status(200);
      }
    }
  );
});

/**
 * POST /api/v1/applications/:application_id/status/rejected
 * Set the status for Application with id 'application_id' to 'rejected'
 */
router.post('/applications/:application_id/status/rejected', function (req, res) {
  Application.findByIdAndUpdate(
    req.params.application_id,
    { $set: { status: 'rejected' } },
    { new: true },
    function (err, application) {
      if (err) {
        res.json({
          status: 'BAD REQUEST',
          status_code: 400,
          message: 'Request could not be completed',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/rejected',
          data: err
        });
        res.status(400);
      } else {
        res.json({
          status: 'OK',
          status_code: 200,
          message: 'Successfully updated job application status to \'rejected\'',
          request: 'POST /api/v1/applications/' + req.params.application_id + '/status/rejected',
          data: application
        });
        res.status(200);
      }
    }
  );
});

module.exports = router;
