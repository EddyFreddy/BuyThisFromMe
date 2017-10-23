const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items');

const Schema = mongoose.Schema;

mongoose.connection.on('connected', () => console.log('connected'));

module.exports = {
  mongoose,
  Schema
};
