import { Input } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useMutate } from '../../hooks/useMutate'

function InputText(): any {
  const [content, setContent] = React.useState('')
  const { data: session, status } = useSession()

  const handleChange = (e) => setContent(e.target.value)
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      mutate()
      setContent('')
    }
  }

  const userId = session.userId

  const { mutate } = useMutate({
    path: '/api/task/create',
    method: 'POST',
    body: JSON.stringify({
      content,
      userId,
    }),
    key: 'tasks',
  })

  return (
    <>
      <Input
        placeholder="New TODO"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={content}
      />
    </>
  )
}

export default InputText
