



import "./App.css";
import CreateTodo from "./Components/CreateTodo";
import Todos from "./Components/Todos";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  // Function to mark a todo as completed
  function markAsCompleted(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: true } : todo
      )
    );
    axios.put("http://localhost:3000/completed", { id })
      .then((res) => {
        console.log(res.data.msg); // Optional: Log success message
      })
      .catch((error) => {
        console.error("Error marking todo as completed:", error);
        // Optionally revert the UI change if the request fails
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: false } : todo
          )
        );
      });
  }

  // Function to delete a todo
  function deleteTodo(id) {
    // Optionally confirm deletion
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    axios.delete(`http://localhost:3000/todo/${id}`)
      .then((res) => {
        console.log(res.data.msg); // Optional: Log success message
        // Remove the todo from the state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        alert("An error occurred while deleting the todo.");
      });
  }

  // Function to add a new todo
  function addTodo(newTodo) {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then(function (res) {
        console.log(res.data.todos);
        setTodos(res.data.todos);
      })
      .catch(function (error) {
        console.error("Error fetching todos:", error);
      });
  }, []); // The empty array ensures this runs only once after the initial render.

  return (
    <div className="flex flex-col items-center pt-[1rem]">
      <h1 className="text-4xl mb-4 font-bold text-cyan-950">Todo List</h1>
      <CreateTodo addTodo={addTodo} />
      <Todos todos={todos} markAsCompleted={markAsCompleted} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
