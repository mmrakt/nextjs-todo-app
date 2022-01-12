import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Todo } from '../Types'

type State = {
  tasks: Todo[]
  filter: string
}

const initialState: State = {
  tasks: [
    {
      key: 'test1',
      text: 'test1',
      done: false,
    },
  ],
  filter: 'TODO',
}

const todoModule = createSlice({
  name: 'tasks',
  initialState,
  // reducers
  reducers: {
    // action creator
    handleAdd(state: State, action: PayloadAction<string>) {
      const getKey = Math.random().toString(32).substring(2)
      const newTodo: Todo = {
        key: getKey,
        text: action.payload,
        done: false,
      }
      state.tasks = [newTodo, ...state.tasks]
    },
    handleFilterChange(state: State, action: PayloadAction<string>) {
      state.filter = action.payload
    },
    handleCheck(state: State, action: PayloadAction<Todo>) {
      const task = state.tasks.find((task) => task.key === action.payload.key)
      if (task) {
        task.done = !task.done
      }
    },
    handleDelete(state: State, action: PayloadAction<Todo>) {
      state.tasks.filter((task) => task.key !== action.payload.key)
    },
  },
})

export const { handleAdd, handleFilterChange, handleCheck, handleDelete } =
  todoModule.actions

export default todoModule
