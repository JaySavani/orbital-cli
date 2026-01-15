import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useLocalStorage from './hooks/useLocalStorage';

/**
 * Main application component for the Todo app.
 * Manages the state of todos, including adding, toggling, and deleting.
 * Utilizes a custom hook `useLocalStorage` for persistent storage.
 */
function App() {
  // Initialize todos state, loading from local storage using the custom hook
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  /**
   * Adds a new todo item to the list.
   * @param {string} text - The text content of the new todo.
   */
  const addTodo = (text) => {
    if (text.trim() === '') {
      // Basic input validation: prevent adding empty todos
      alert('Todo cannot be empty!');
      return;
    }
    const newTodo = {
      id: Date.now(), // Unique ID for the todo
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  /**
   * Toggles the completion status of a todo item.
   * @param {number} id - The ID of the todo to toggle.
   */
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Deletes a todo item from the list.
   * @param {number} id - The ID of the todo to delete.
   */
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-8">Todo App</h1>

        {/* Todo Input Form */}
        <TodoForm addTodo={addTodo} />

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-2 my-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${filter === 'active' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${filter === 'completed' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Completed ({todos.length - activeCount})
          </button>
        </div>

        {/* Todo List Display */}
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-lg">No todos yet! Add some tasks above.</p>
        )}

        {todos.length > 0 && filteredTodos.length === 0 && filter !== 'all' && (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No {filter} todos. Try changing the filter or adding a new one!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
