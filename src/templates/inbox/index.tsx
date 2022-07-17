import React from 'react'

import SpaLayout from '../../components/SpaLayout'
import TodoContainer from '../../components/todo/TodoContainer'
import useCheckSession from '../../hooks/useCheckSession'

const Inbox: React.VFC = () => {
  // const result = useCheckSession()
  // if (result === null) return null

  // TODO: 本番では差し替えておく
  const result = {
    id: 'cl2myuo0x00297kiby38pl87e',
  }

  return (
    <SpaLayout>
      <TodoContainer user={result} />
    </SpaLayout>
  )
}

export default Inbox
