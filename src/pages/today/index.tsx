import React from 'react'

import Layout from '../../components/Layout'
import TodoContainer from '@/components/todo/Container'

function Today(): React.ReactElement {
  return (
    <Layout>
      <TodoContainer />
    </Layout>
  )
}

export default Today
