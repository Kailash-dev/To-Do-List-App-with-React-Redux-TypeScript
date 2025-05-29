import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store/store'
import { addTodo, toggleTodo, removeTodo, setFilter } from './store/todoSlice'
import './App.css'

interface TodoInputState {
  title: string
  description: string
}

function App() {
  const [input, setInput] = useState<TodoInputState>({ title: '', description: '' })
  const todos = useSelector((state: RootState) => state.todos.todos)
  const filter = useSelector((state: RootState) => state.todos.filter)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (input.title.trim()) {
      dispatch(addTodo({ title: input.title, description: input.description }))
      setInput({ title: '', description: '' })
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={input.title}
          onChange={e => setInput({ ...input, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={input.description}
          onChange={e => setInput({ ...input, description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="todo-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => dispatch(setFilter('all'))}
        >All</button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => dispatch(setFilter('active'))}
        >Active</button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch(setFilter('completed'))}
        >Completed</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-main" onClick={() => dispatch(toggleTodo(todo.id))}>
              <span className="todo-title">{todo.title}</span>
              <span className="todo-desc">{todo.description}</span>
            </div>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
