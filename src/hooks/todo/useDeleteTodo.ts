import { useMutation, useQueryClient } from 'react-query'
import { Todo } from '@/libs/prisma'

const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (todo: Todo) =>
      fetch(`api/todos/${todo.id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: (data, variables) => {
        if (variables.isCompleted) {
          queryClient.invalidateQueries('completedTodos')
        } else {
          queryClient.invalidateQueries('todos')
        }
      },
    }
  )
}

export { useDeleteTodo }
