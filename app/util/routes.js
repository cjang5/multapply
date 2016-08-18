'use strict';

const express = require('express');

exports.response = function (res, status_code, message, request, data) {
  res.status(status_code);
  let json = {
    status: '',
    status_code: status_code,
    message: message,
    request: request,
    data: (data ? data : '')
  };

  switch (status_code) {
  case 200:
  case 201:
  case 204:
    json.status = 'OK';
    break;
  case 304:
    json.status = 'NOT MODIFIED';
    break;
  case 400:
    json.status = 'BAD REQUEST';
    break;
  case 401:
    json.status = 'UNAUTHORIZED';
    break;
  case 403:
    json.status = 'FORBIDDEN';
    break;
  case 404:
    json.status = 'NOT FOUND';
    break;
  case 422:
    json.status = 'UNPROCESSABLE ENTITY';
    break;
  case 500:
    json.status = 'INTERNAL SERVER ERROR';
    break;
  }

  res.json(json);
}
