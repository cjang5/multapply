'use strict';

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Hashids  = require('hashids');
const hashids  = new Hashids(process.env.users_salt, 9, process.env.alphabet);

// User Model
const User = require('../models/user');

/**
 * GET /api/v1/users
 * Get all Users
 */
router.get('/users', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/users',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved all users',
        request: 'GET /api/v1/users',
        data: users
      });
      res.status(200);
    }
  });
});

/**
 * POST /api/v1/users
 * Create a new User
 */
router.post('/users', function (req, res) {
  let user = new User(req.body);
  user._id = hashids.encode(new Date().getTime());

  user.save(function (err) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'POST /api/v1/users',
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 201,
        message: 'Successfully created new user',
        request: 'POST /api/v1/users',
        data: user
      });
      res.status(201);
    }
  });
});

/**
 * GET /api/v1/users/:user_id
 * Get User with id 'user_id'
 */
router.get('/users/:user_id', function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'GET /api/v1/users/' + req.params.user_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully retrieved user',
        request: 'GET /api/v1/users/' + req.params.user_id,
        data: user
      });
      res.status(200);
    }
  });
});

/**
 * PUT /api/v1/users/:user_id
 * Update User with id 'user_id'
 */
router.put('/users/:user_id', function (req, res) {
  User.findByIdAndUpdate(req.params.user_id, { $set: req.body }, { new: true }, function (err, user) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'PUT /api/v1/users/' + req.params.user_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 200,
        message: 'Successfully updated user',
        request: 'PUT /api/v1/users/' + req.params.user_id,
        data: user
      });
      res.status(200);
    }
  });
});

/**
 * DELETE /api/v1/users/:user_id
 * Delete User with id 'user_id'
 */
router.delete('/users/:user_id', function (req, res) {
  User.findByIdAndRemove(req.params.user_id, function (err, user) {
    if (err) {
      res.json({
        status: 'BAD REQUEST',
        status_code: 400,
        message: 'Request could not be completed',
        request: 'DELETE /api/v1/users/' + req.params.user_id,
        data: err
      });
      res.status(400);
    } else {
      res.json({
        status: 'OK',
        status_code: 204,
        message: 'Successfully deleted user',
        request: 'DELETE /api/v1/users/' + req.params.user_id,
        data: user
      });
      res.status(204);
    }
  });
});

module.exports = router;
