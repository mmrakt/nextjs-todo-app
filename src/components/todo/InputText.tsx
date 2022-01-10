import { Input } from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useQueryClient } from 'react-query'

import { db } from '../../../functions/firebase'
import { handleAdd } from '../../modules/todoModule'

type IData = {
  text: string
  done: boolean
}

function InputText(): any {
  const [text, setText] = React.useState('')
  const queryClient = useQueryClient()

  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      store()
      const todos = queryClient.getQueryData<IData[]>('todos')
      queryClient.setQueryData('todos', [
        todos,
        {
          text,
          done: false,
        },
      ])
      setText('')
    }
  }

  const store = async () => {
    await addDoc(collection(db, 'todos'), {
      text,
      done: false,
    })
  }

  return (
    <>
      <Input
        placeholder="New TODO"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={text}
      />
    </>
  )
}

export default InputText
