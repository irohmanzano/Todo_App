const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todosController');

router.route('/')
      .post(createTodo)
      .put(updateTodo)
      .delete(deleteTodo);

router.route('/:userID')
      .get(getTodos)

module.exports = router;