// import { List as ChakraUiList } from '@chakra-ui/react'
// import React from 'react'
// import { useQuery } from 'react-query'
// import Row from './TodoRow'
// import { Todo } from '@/libs/prisma'

// function CompletedList({ userId }: { userId: string }): any {
//   const { data: todos, isLoading } = useQuery<Todo[]>(
//     'completedTasks',
//     async () => {
//       const res = await fetch(`/api/todos?status=1&userId=${userId}`)
//       return res.json()
//     }
//   )

//   if (isLoading) return <span>Loading...</span>

//   return (
//     <ChakraUiList>
//       {todos.map((task, index) => (
//         <Row data-testid="todoItem" key={index} {...todo} />
//       ))}
//     </ChakraUiList>
//   )
// }

// export default CompletedList
