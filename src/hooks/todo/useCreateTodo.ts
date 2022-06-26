import { useMutation, useQueryClient } from 'react-query'

type IProps = {
  content: string
  userId: string
}

const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ content, userId }: IProps) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          content,
          userId,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      },
    }
  )
}

export { useCreateTodo }
