import React from 'react';
import Button from './Button';

/**
 * TodoItem component displays a single todo item.
 * Allows toggling its completion status and deleting it.
 * @param {object} props - Component props.
 * @param {object} props.todo - The todo object {id, text, completed}.
 * @param {function} props.toggleTodo - Function to call when toggling completion.
 * @param {function} props.deleteTodo - Function to call when deleting the todo.
 */
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
        />
        <span
          className={`ml-4 text-lg font-medium flex-grow break-words text-gray-800
            ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.text}
        </span>
      </div>
      <Button
        onClick={() => deleteTodo(todo.id)}
        variant="danger"
        aria-label={`Delete ${todo.text}`}
        className="ml-4 flex-shrink-0"
      >
        Delete
      </Button>
    </li>
  );
}

export default TodoItem;
