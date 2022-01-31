import React from 'react'

import Layout from '../components/layout'
import TodoContainer from '@/components/task/Container'

function Index(): React.ReactElement {
  return (
    <Layout>
      <TodoContainer />
    </Layout>
  )
}

export default Index
