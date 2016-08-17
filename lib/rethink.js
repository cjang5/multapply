'use strict';

const rdb      = require('rethinkdb');
const dbConfig = require('../config/init/database');

// connect to the db
const connection = rdb.connect(dbConfig)
.then(function (connection) {
  // find a row by id in tableName
  module.exports.find = function (tableName, id) {
    return rdb.table(tableName).get(id).run(connection)
    .then(function (result) {
      return result;
    });
  };

  // get all rows in tableName
  module.exports.findAll = function (tableName) {
      return rdb.table(tableName).run(connection)
      .then(function (cursor) {
          return cursor.toArray();
      });
  };

  // find a row in tableName by attribute value
  module.exports.findBy = function (tableName, fieldName, value) {
      return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).run(connection)
      .then(function (cursor) {
          return cursor.toArray();
      });
  };

  module.exports.findIndexed = function (tableName, query, index) {
      return rdb.table(tableName).getAll(query, { index: index }).run(connection)
      .then(function (cursor) {
          return cursor.toArray();
      });
  };

  // insert an object into tableName
  module.exports.save = function (tableName, object) {
      return rdb.table(tableName).insert(object).run(connection)
      .then(function (result) {
          return result;
      });
  };

  // edit object of id 'id'
  module.exports.edit = function (tableName, id, object) {
      return rdb.table(tableName).get(id).update(object).run(connection)
      .then(function (result) {
          return result;
      });
  };

  // delete object with id 'id'
  module.exports.destroy = function (tableName, id) {
      return rdb.table(tableName).get(id).delete().run(connection)
      .then(function (result) {
          return result;
      });
  };
});

