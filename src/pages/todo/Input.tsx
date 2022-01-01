import { TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React from 'react'
import { useDispatch } from 'react-redux'

import { db } from '../../../functions/firebase'
import { handleAdd } from '../../modules/todoModule'

function Input(): any {
  const dispatch = useDispatch()
  const [text, setText] = React.useState('')

  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(handleAdd(text))

      db.collection('todos').add({
        text,
        done: false,
      })
      setText('')
    }
  }
  return (
    <>
      <TextField
        data-testid="text"
        fullWidth
        type="text"
        value={text}
        placeholder="Add Todo"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <AddIcon />
    </>
  )
}

export default Input
