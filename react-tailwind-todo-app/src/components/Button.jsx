import React from 'react';

/**
 * A reusable Button component with customizable styles based on variant.
 * @param {object} props - Component props.
 * @param {string} [props.variant='primary'] - Defines the button's style. Can be 'primary', 'danger', etc.
 * @param {string} [props.type='button'] - The native HTML button type (e.g., 'button', 'submit', 'reset').
 * @param {string} [props.className=''] - Additional CSS classes to apply.
 * @param {function} props.onClick - Event handler for click events.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 */
function Button({ variant = 'primary', type = 'button', className = '', onClick, children, ...rest }) {
  const baseStyles = 'px-5 py-2 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary hover:bg-secondary focus:ring-primary';
      break;
    case 'danger':
      variantStyles = 'bg-danger hover:bg-red-600 focus:ring-danger';
      break;
    // Add more variants as needed
    default:
      variantStyles = 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
