import React, { useState } from 'react';

// Fungsi bantuan untuk menghasilkan ID unik
const generateUniqueId = () => Date.now();

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // 1. Fungsi Handler

  // Menambah todo baru
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: generateUniqueId(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue(''); // Reset input
  };

  // Menghapus todo
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Toggle status selesai/belum selesai
  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Logika Filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true; // filter === 'all'
  });

  // Statistik
  const totalTodos = todos.length;
  const activeTodos = todos.filter(todo => !todo.completed).length;

  // 2. Tampilan (UI)

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#333' }}>📝 Todo List</h2>

      {/* Input untuk menambah todo baru */}
      <form onSubmit={addTodo} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px 0 0 4px', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontSize: '1rem' }}>
          Add
        </button>
      </form>

      {/* List todo items */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
              backgroundColor: todo.completed ? '#f0f8ff' : 'white',
              transition: 'background-color 0.3s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: '#333' }}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              &times;
            </button>
          </li>
        ))}
        {filteredTodos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6c757d', padding: '10px' }}>
            {todos.length === 0 ? 'Belum ada tugas.' : `Tidak ada tugas yang sesuai filter '${filter}'.`}
          </p>
        )}
      </ul>
      
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

      {/* Filter buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{ 
              padding: '8px 15px', 
              backgroundColor: filter === f ? '#007bff' : '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {f}
          </button>
        ))}
      </div>
      
      {/* Counter total todos dan active todos */}
      <div style={{ textAlign: 'left', marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee' }}>
        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333' }}>📊 Statistik:</p>
        <p style={{ margin: '5px 0' }}>Total Tasks: {totalTodos}</p>
        <p style={{ margin: '5px 0' }}>Active Tasks: {activeTodos}</p>
      </div>
    </div>
  );
};

export default TodoList;