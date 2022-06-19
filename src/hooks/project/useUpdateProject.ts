import { useMutation, useQueryClient } from 'react-query'
import { TODO_STATUSES } from '@/constants'
import { Todo } from '@/libs/prisma'

const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (todo: Todo) =>
      fetch(`api/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(todo),
      }),
    {
      onMutate: async (newTodo: Todo) => {
        await queryClient.cancelQueries('todos')
        const previousTodos = queryClient.getQueryData('todos')
        queryClient.setQueryData<Todo[] | undefined>('todos', (old) => {
          const id = newTodo.id
          const data = old?.map((todo) => {
            if (Number(todo.id) === Number(id)) {
              return newTodo
            }
            return todo
          })
          return data
        })

        return { previousTodos }
      },
      onError: (
        err,
        newTodo,
        context:
          | {
              previousTodos: unknown
            }
          | undefined
      ) => {
        queryClient.setQueryData(
          'todos',
          context ? context.previousTodos : context
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          'todos',
          { status: TODO_STATUSES['isCompleted'] },
        ])
        queryClient.invalidateQueries([
          'todos',
          { status: TODO_STATUSES['isNotCompleted'] },
        ])
      },
    }
  )
}

export { useUpdateTodo }
