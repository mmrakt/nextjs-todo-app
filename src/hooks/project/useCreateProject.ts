import { useMutation, useQueryClient } from 'react-query'
import { TODO_STATUSES } from '../../constants/index'

type IProps = {
  content: string
  userId: string
}

const useCreateProject = () => {
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

export { useCreateProject }
