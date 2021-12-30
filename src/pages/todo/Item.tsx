import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

type Props = {
  todo: {
    key: string
    text: string
    done: boolean
  }
}
function TodoItem(props: Props): any {
  const { todo } = props
  return (
    <>
      <ListItem button>
        <Checkbox data-testid="checkbox" checked={todo.done} />
        <ListItemText
          primary={todo.text}
          style={
            todo.done
              ? { textDecoration: 'line-through', color: 'grey' }
              : { textDecoration: 'none' }
          }
        />
        <DeleteIcon />
      </ListItem>
      <Divider />
    </>
  )
}

export default TodoItem
