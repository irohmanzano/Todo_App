const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userID: {
    required: true,
    type: String
  },
  todo: {
    required: true,
    type: String
  },
  done: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', todoSchema);