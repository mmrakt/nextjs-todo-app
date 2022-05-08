import { List as ChakraUiList } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import Row from './TodoRow'
import { useFetchTodos, useDeleteTodo, useUpdateTodo } from '@/hooks/todo'
import { Todo } from '@/libs/prisma'

function TodoList({ userId }: { userId: string }): any {
  const { data: todos, isError, isLoading } = useFetchTodos(userId)
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const handleUpdateStatus = (todo: Todo) => {
    // タスクが完了済みの場合はnullにする
    todo.completedAt = todo.isCompleted ? null : new Date(dayjs().format())
    todo.isCompleted = !todo.isCompleted
    updateTodoMutation.mutate(todo)
  }

  const handleUpdateContent = (todo: Todo, content: string) => {
    todo.content = content
    updateTodoMutation.mutate(todo)
  }

  const handleDelete = (todo: Todo) => {
    deleteTodoMutation.mutate(todo)
  }

  if (isLoading) return <span>Loading...</span>

  return (
    <ChakraUiList>
      {todos.map((todo, index) => (
        <Row
          data-testid="todoItem"
          key={index}
          handleDelete={handleDelete}
          handleUpdateContent={handleUpdateContent}
          handleUpdateStatus={handleUpdateStatus}
          todo={todo}
        />
      ))}
    </ChakraUiList>
  )
}

export default TodoList
