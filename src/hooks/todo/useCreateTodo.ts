import { useMutation, useQueryClient } from 'react-query'

type IProps = {
  content: string
  userId: string
  projectId?: number
}

const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ content, userId, projectId = 0 }: IProps) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          content,
          userId,
          projectId,
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
