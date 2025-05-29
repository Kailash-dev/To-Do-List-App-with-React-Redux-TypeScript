import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: FilterStatus;
}

const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch {
    // Ignore write errors
  }
};

const initialState: TodoState = {
  todos: loadTodos(),
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.todos.push(newTodo);
      saveTodos(state.todos);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos(state.todos);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodos(state.todos);
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    loadFromStorage: (state) => {
      state.todos = loadTodos();
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter, loadFromStorage } = todoSlice.actions;
export default todoSlice.reducer; 