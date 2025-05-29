import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { addTodo, toggleTodo, removeTodo } from './todoSlice'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span style={{color:'black'}} onClick={() => dispatch(toggleTodo(todo.id))}>{todo.text}</span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
