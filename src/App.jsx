import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  //  Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Move Task
  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filter tasks
  const getTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="app">
      <h1>Task Board</h1>

      {/* Input */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Columns */}
      <div className="board">
        {/* To Do */}
        <div className="column">
          <h2>To Do</h2>
          {getTasks("todo").map((task) => (
            <div key={task.id} className="card">
              <p>{task.text}</p>

              <div className="buttons">
                <button onClick={() => deleteTask(task.id)}>X</button>
                <button onClick={() => moveTask(task.id, "progress")}>
                  → In Progress
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress */}
        <div className="column">
          <h2>In Progress</h2>
          {getTasks("progress").map((task) => (
            <div key={task.id} className="card">
              <p>{task.text}</p>

              <div className="buttons">
                <button onClick={() => deleteTask(task.id)}>X</button>
                <button onClick={() => moveTask(task.id, "done")}>
                  → Done
                </button>
                <button onClick={() => moveTask(task.id, "todo")}>
                  ← To Do
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Done */}
        <div className="column">
          <h2>Done</h2>
          {getTasks("done").map((task) => (
            <div key={task.id} className="card">
              <p>{task.text}</p>

              <div className="buttons">
                <button onClick={() => deleteTask(task.id)}>X</button>
                <button onClick={() => moveTask(task.id, "progress")}>
                  ← In Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;