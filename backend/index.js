
const express = require("express");
const { createTodo, updateTodo, deleteTodo } = require("./types"); // Import deleteTodo
const { Todo } = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.post("/todo", async function (req, res) {
  try {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
      return res.status(400).json({
        msg: "You sent the wrong inputs",
        error: parsedPayload.error,
      });
    }

    const newtodo = await Todo.create({
      title: parsedPayload.data.title,
      description: parsedPayload.data.description,
      completed: false,
    });

    res.json({ todo: newtodo, msg: "Todo created successfully" });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// GET route to fetch all todos
app.get("/todos", async function (req, res) {
  try {
    const todos = await Todo.find({});
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// PUT route to mark a todo as completed
app.put("/completed", async function (req, res) {
  try {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
      return res.status(400).json({
        msg: "You sent the wrong inputs",
        error: parsedPayload.error,
      });
    }

    const result = await Todo.updateOne(
      { _id: parsedPayload.data.id },
      { completed: true }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ msg: "Todo not found or already completed" });
    }

    res.json({ msg: "Todo marked as completed" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// DELETE route to remove a todo
app.delete("/todo/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const parsedPayload = deleteTodo.safeParse({ id });

    if (!parsedPayload.success) {
      return res.status(400).json({
        msg: "You sent the wrong inputs",
        error: parsedPayload.error,
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(parsedPayload.data.id);

    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});






































