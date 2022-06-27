import { List as ChakraUiList } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import { UseQueryResult } from 'react-query'
import Loading from '../common/Loading'
import Row from './TodoRow'
import { useDeleteTodo, useUpdateTodo } from '@/hooks/todo'
import { Todo } from '@/libs/prisma'

type IProps = {
  query: UseQueryResult<Todo[]>
  userId: string
}

const TodoList: React.VFC<IProps> = ({ query, userId }): any => {
  const { data: todos, isLoading, isError } = query
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

  if (isLoading) return <Loading />

  return (
    <ChakraUiList>
      {/* NOTE: keyにindexを渡すと追加時にキャッシュがうまく更新されない */}
      {todos.map((todo, i) => (
        <Row
          data-testid="todoItem"
          key={todo.id}
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
