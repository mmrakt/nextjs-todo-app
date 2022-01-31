import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import InputField from '@/components/common/InputField'

function InputText(): any {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()

  const onSubmit = async ({ content }) => {
    storeTaskMutate(content)
    reset()
  }

  const userId = session?.user.id

  const { mutate: storeTaskMutate } = useMutation(
    (content: string) =>
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          content,
          userId,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks')
      },
    }
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name="content" placeholder="New TODO" register={register} />
      </form>
    </>
  )
}

export default InputText
