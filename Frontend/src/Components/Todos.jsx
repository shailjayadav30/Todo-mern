

const Todos = ({ todos, markAsCompleted, deleteTodo }) => {
  return (
    <div className="space-y-4">
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          if (!todos || !todo._id) return null;
          return (
            <div
              key={todo._id}
              className="w-full max-w-md p-4 bg-cyan-50 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-700">{todo.title}</h1>
                <h2 className="text-gray-600">{todo.description}</h2>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => markAsCompleted(todo._id)}
                  disabled={todo.completed}
                  className={`p-2 text-sm rounded-lg transition duration-300 ${
                    todo.completed
                      ? "bg-cyan-700 cursor-not-allowed text-white"
                      : "bg-cyan-800 text-white hover:bg-cyan-700"
                  }`}
                >
                  {todo.completed ? "Completed" : "Mark as Done"}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="p-2 text-sm rounded-lg bg-cyan-600 text-white hover:bg-red-500 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-cyan-950 font-semibold text-xl">
          No todos available.
        </p>
      )}
    </div>
  );
};

export default Todos;
