import React from 'react';
import TodoItem from './TodoItem';

/**
 * TodoList component responsible for rendering a list of TodoItem components.
 * It iterates over the 'todos' array and passes necessary props to each TodoItem.
 * @param {object} props - Component props.
 * @param {Array<object>} props.todos - An array of todo objects.
 * @param {function} props.toggleTodo - Function to toggle a todo's completion status.
 * @param {function} props.deleteTodo - Function to delete a todo.
 */
function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Unique key for list rendering optimization
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
