import List from '@material-ui/core/List'
import React from 'react'
import { useSelector } from 'react-redux'

import { rootState } from '../../rootReducer'

import TodoItem from './Item'

type Props = {
  status: string
}
function TodoTabPanel(props: Props): any {
  const { status } = props
  const { todos, filter } = useSelector((state: rootState) => state.todos)
  const displayTodos = todos.filter((todo) => {
    if (todo) {
      switch (filter) {
        case 'ALL':
          return true
        case 'TODO':
          return !todo.done
        case 'DONE':
          return todo.done
      }
    }
  })

  return (
    <List component="nav" hidden={filter !== status} role="tabpanel">
      {displayTodos.map((todo, index) => (
        <TodoItem data-testid="todoItem" key={index} todo={todo} />
      ))}
    </List>
  )
}

export default TodoTabPanel
