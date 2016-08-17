'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

// Company Model
const Company = require('../models/company');

/**
 * GET /api/v1/companies
 * Get all Companies
 */
router.get('/companies', function (req, res) {
  Company.find(function (err, companies) {
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
        data: companies
      });
    }
  });
});

/**
 * POST /api/v1/companies
 * Create a new Company
 */
router.post('/companies', function (req, res) {
  let company = new Company(req.body);

  company.save(function (err) {
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
        data: company
      });
    }
  });
});

/**
 * GET /api/v1/companies/:company_id
 * Get Company with id 'company_id'
 */
router.get('/companies/:company_id', function (req, res) {
  Company.findById(req.params.company_id, function (err, company) {
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
        data: company
      });
    }
  });
});

/**
 * PUT /api/v1/companies/:company_id
 * Update Company with id 'company_id'
 */
router.put('/companies/:company_id', function (req, res) {
  Company.findOneAndUpdate(req.params.company_id, { $set: req.body }, { new: true }, function (err, company) {
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
        data: company
      });
    }
  });
});

/**
 * DELETE /api/v1/companies/:company_id
 * Delete Company with id 'company_id'
 */
router.delete('/companies/:company_id', function (req, res) {
  Company.remove({ _id: req.params.company_id }, function (err, company) {
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
        data: company
      });
    }
  });
});

module.exports = router;
