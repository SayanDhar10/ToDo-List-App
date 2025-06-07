import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggle = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter a task..." 
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li 
            key={index} 
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
            <div className="btns">
              <button onClick={() => handleToggle(index)}>
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
