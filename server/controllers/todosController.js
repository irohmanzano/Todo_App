const Todo = require('../model/Todo');

const getTodos = async (req, res) => {
  try {
    const { userID } = req.params;
    if(!userID) return res.sendStatus(400);

    const foundTodos = await Todo.find({ userID });
    if(!foundTodos) return res.sendStatus(204);
    res.json(foundTodos);
  }
  catch {
    res.sendStatus(500);
  }
};

const createTodo = async (req, res) => {
  try {
    const { userID, todo } = req.body;
    if(!userID || !todo) return res.sendStatus(400);
    await Todo.create({
      userID,
      todo
    });
    res.sendStatus(201);
  }
  catch {
   res.sendStatus(500);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoID, todo, done } = req.body;
    if(!todoID || !todo || done === undefined || done === null) return res.sendStatus(400);
    const result = await Todo.findByIdAndUpdate(todoID, { todo, done }, { new: true });
    if(!result) return res.sendStatus(404);
    res.json(result);
  }
  catch {
   res.sendStatus(500);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoID } = req.body;
    if(!todoID) return res.sendStatus(400);
    await Todo.findByIdAndDelete(todoID);
    res.sendStatus(200);
  }
  catch {
   res.sendStatus(500);
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }