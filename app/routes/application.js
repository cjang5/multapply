'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Hashids  = require('hashids');

// Global counts
const CountsModel = require('../models/counts');
let Counts;
CountsModel.findOne(function (err, counts) {
  if (err) {
    console.error("Error getting Counts Document");
  } else {
    Counts = counts;
  }
});

// Application Model
const Application = require('../models/application');

/**
 * GET /api/v1/applications
 * Get all Job Applications
 */
router.get('/applications', function (req, res) {
  Application.find(function (err, applications) {
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
        data: applications
      });
    }
  });
});

/**
 * POST /api/v1/applications
 * Create a new Job Application
 */
router.post('/applications', function (req, res) {
  const hashids = new Hashids(Counts.application_salt, 8, Counts.alphabet);

  let application = new Application(req.body);
  application._id = hashids.encode(Counts.applications + 1);

  application.save(function (err) {
    if (err) {
      res.status(404);
      res.json({
        status: 'error',
        status_code: 404,
        data: err
      });
    } else {
      Counts.applications += 1;
      res.json({
        status: 'success',
        status_code: 200,
        data: application
      });
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
        data: application
      });
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
        data: application
      });
    }
  });
});

/**
 * DELETE /api/v1/applications/:application_id
 * Delete Job Application with id 'application_id'
 */
router.delete('/applications/:application_id', function (req, res) {
  Application.remove({ _id: req.params.application_id }, function (err, application) {
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
        data: application
      });
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
        data: application.status
      });
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
          data: application
        });
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
          data: application
        });
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
          data: application
        });
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
          data: application
        });
      }
    }
  );
});

module.exports = router;
