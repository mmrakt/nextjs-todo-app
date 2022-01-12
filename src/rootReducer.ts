import { combineReducers } from '@reduxjs/toolkit'

import todoModule from './modules/todoModule'

const rootReducer = combineReducers({
  tasks: todoModule.reducer,
})

export type rootState = ReturnType<typeof rootReducer>

export default rootReducer
