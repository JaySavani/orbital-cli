# React Tailwind Todo App

A modern, responsive, and functional todo application built with React and styled using Tailwind CSS. This application demonstrates best practices for React development, including state management, component-based architecture, form handling, and local storage integration for data persistence.

## Features

-   **Add Todos**: Easily add new tasks to your list.
-   **Toggle Completion**: Mark todos as complete or incomplete.
-   **Delete Todos**: Remove tasks from your list.
-   **Persistent Storage**: Your todos are saved in your browser's local storage, so they persist even after you close the tab.
-   **Responsive Design**: Built with Tailwind CSS for a clean, mobile-first, and responsive user interface.
-   **Input Validation**: Prevents adding empty todo items.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool for modern web projects.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-   **JavaScript (ES6+)**: Modern JavaScript syntax and features.

## Installation

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-tailwind-todo-app.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd react-tailwind-todo-app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

## Usage

To start the development server:

```bash
npm run dev
# or yarn dev
```

This will open the application in your browser, usually at `http://localhost:5173`. Any changes you make to the code will trigger a hot reload.

## Project Structure

```
react-tailwind-todo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

-   `src/App.jsx`: The main application component, managing global state and layout.
-   `src/main.jsx`: The entry point for the React application.
-   `src/index.css`: Global styles, including Tailwind CSS imports.
-   `src/components/`: Contains reusable UI components.
-   `src/hooks/`: Contains custom React hooks.
-   `public/`: Static assets.

## License

This project is open-source and available under the MIT License.
