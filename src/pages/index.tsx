import React from 'react'

import Layout from '../components/layout'
import TodoContainer from '../components/todo/Container'

function Index(): React.ReactElement {
  return (
    <Layout title="Dashboard">
      <TodoContainer />
    </Layout>
  )
}

export default Index
