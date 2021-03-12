import React, { useEffect, useState } from 'react'
import './App.css';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Typography from '@material-ui/core/Typography'

const LOCAL_STORAGE_KEY = 'react-todo-list-todos'

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    )
  };

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  return (
    <div className="App">
        <div className="list__container">
          <Typography className="title" style={{fontFamily: "Recursive, sans-serif"}} variant="h2">To Do List</Typography><br/>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        </div>
    </div>
  );
}

export default App;
