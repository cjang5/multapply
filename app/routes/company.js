'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Hashids  = require('hashids');
const hashids  = new Hashids(process.env.companies_salt, 9, process.env.hashids_alphabet);

// Company Model
const Company = require('../models/company');

/**
 * GET /api/v1/companies
 * Get all Companies
 */
router.get('/companies', function (req, res) {
  Company.find(function (err, companies) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/companies',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all companies',
        request: 'GET /api/v1/companies',
        data: companies
      });
      res.status(200);
    }
  });
});

/**
 * POST /api/v1/companies
 * Create a new Company
 */
router.post('/companies', function (req, res) {
  let company = new Company(req.body);
  company._id = hashids.encode(new Date().getTime());

  company.save(function (err) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'POST /api/v1/companies',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 201,
        message: 'Successfully created new company',
        request: 'POST /api/v1/companies',
        data: company
      });
      res.status(201);
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/companies/' + req.params.company_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved company',
        request: 'GET /api/v1/companies/' + req.params.company_id,
        data: company
      });
      res.status(200);
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
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'PUT /api/v1/companies/' + req.params.company_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully updated company',
        request: 'PUT /api/v1/companies/' + req.params.company_id,
        data: company
      });
      res.status(200);
    }
  });
});

/**
 * DELETE /api/v1/companies/:company_id
 * Delete Company with id 'company_id'
 */
router.delete('/companies/:company_id', function (req, res) {
  Company.findByIdAndRemove(req.params.company_id, function (err, company) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'DELETE /api/v1/companies/' + req.params.company_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 204,
        message: 'Successfully deleted company',
        request: 'DELETE /api/v1/companies/' + req.params.company_id,
        data: company
      });
      res.status(204)
    }
  });
});

/**
 * GET /api/v1/companies/:company_id/job_ids
 * Get list of Job id's for Company with id 'company_id'
 */
router.get('/companies/:company_id/job_ids', function (req, res) {
  Company.findById(req.params.company_id, function (err, company) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/companies/' + req.params.company_id + '/job_ids',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved company\'s job_ids',
        request: 'GET /api/v1/companies/' + req.params.company_id + '/job_ids',
        data: company.job_ids
      });
      res.status(200);
    }
  });
});

module.exports = router;
