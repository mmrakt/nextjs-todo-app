import { List as ChakraUiList } from '@chakra-ui/react'
import { getDoc, doc, getDocs, query, collection } from 'firebase/firestore'
import React from 'react'
import { useQuery } from 'react-query'

import Item from './Item'
import { db } from 'functions/firebase'

type Props = {
  status: string
}
function List(props: Props): any {
  const fetchTodos = async () => {
    const snapshot = await getDocs(query(collection(db, 'todos')))
    const todos = []
    snapshot.forEach((doc) => {
      todos.push(doc.data())
    })
    return todos
  }

  const { isLoading, error, data } = useQuery('todos', fetchTodos)

  if (isLoading) return '...Loading'
  console.log('hgoe')
  return (
    <ChakraUiList>
      {data.map((todo, index) => (
        <Item data-testid="todoItem" key={index} {...todo} />
      ))}
    </ChakraUiList>
  )
}

export default List
