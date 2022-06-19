import { useMutation, useQueryClient } from 'react-query'
import { TODO_STATUSES } from '../../constants/index'
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
          queryClient.invalidateQueries([
            'todos',
            { status: TODO_STATUSES['isCompleted'] },
          ])
        } else {
          queryClient.invalidateQueries([
            'todos',
            { status: TODO_STATUSES['isNotCompleted'] },
          ])
        }
      },
    }
  )
}

export { useDeleteTodo }
