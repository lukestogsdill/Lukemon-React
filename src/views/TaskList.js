import React, { useState } from "react";
import '../TaskList.css';

function TaskList() {
  const [task, setTask] = useState([]);

  function addTask(newTask) {
    setTask([...task, newTask]);
  }

  function delTask(index) {
    const updatedTask = task.filter((task, i) => i !== index);
    setTask(updatedTask);
  }

  function editTask(text, index) {
    const updatedTask = [...task];
    updatedTask[index] = text;
    setTask(updatedTask);
  }

  return (
    <div className="taskListTree">
      <div className="taskListContainer">
        <h1>My Task List</h1>
        <TaskForm onAddTask={addTask} />
        <ul>
          {task.map((task, index) => (
            <TaskItem
            key={index}
            text={task}
            onDelete={() => delTask(index)}
            onEdit={(text) => editTask(text, index)}
            />
            ))}
        </ul>
      </div>
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask(text);
    setText("");
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="textbox" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

function TaskItem({ text, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);

  function handleDelete() {
    onDelete();
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    onEdit(textValue);
    setEditing(false);
  }

  function handleCancel() {
    setTextValue(text);
    setEditing(false);
  }

  function handleChange(event) {
    setTextValue(event.target.value);
  }

  return (
    <li className="task">
      {editing ? (
        <div>
          <input type="textbox" value={textValue} onChange={handleChange} />
          <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="taskItems">
          <span>{text}</span>
          <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
        </div>
      )}
    </li>
  );
}

export default TaskList;
