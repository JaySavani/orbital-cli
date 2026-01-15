import React, { useState } from 'react';
import Button from './Button';

/**
 * TodoForm component for adding new todo items.
 * Handles user input and triggers the addTodo function from props.
 */
function TodoForm({ addTodo }) {
  // State to hold the current input value for a new todo
  const [inputValue, setInputValue] = useState('');

  /**
   * Handles the form submission event.
   * Prevents default form submission, calls addTodo with the input value,
   * and clears the input field.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue.trim()); // Trim whitespace before adding
    setInputValue(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch space-x-3 mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo item"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 transition-all duration-200"
      />
      <Button type="submit" variant="primary">
        Add Todo
      </Button>
    </form>
  );
}

export default TodoForm;
