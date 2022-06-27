import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '@/components/common/InputField'
import { useCreateTodo } from '@/hooks/todo'

type IProps = {
  projectId?: number
}

const InputText: React.VFC<IProps> = ({ projectId }) => {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset } = useForm()
  const createTodoMutation = useCreateTodo()
  const userId = session?.user.id

  const onSubmit = async ({ content }) => {
    if (content !== '') {
      createTodoMutation.mutate({ content, userId, projectId })
      reset()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name="content" placeholder="New TODO" register={register} />
      </form>
    </>
  )
}

export default InputText
