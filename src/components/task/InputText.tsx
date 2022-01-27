import { Input } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useMutate } from '../../hooks/useMutate'

function InputText(): any {
  const [content, setContent] = React.useState('')
  const { data: session, status } = useSession()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      content !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      mutate()
      setContent('')
    }
  }

  const userId = session?.user.id

  const { mutate } = useMutate({
    path: '/api/tasks',
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
