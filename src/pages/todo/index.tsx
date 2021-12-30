import { Container } from '@material-ui/core'
import React from 'react'

import Filter from './Filter'
import Input from './Input'
import TodoTabPanel from './TabPanel'

import Layout from '@/components/layout'

function Todo(): React.ReactElement {
  const statuses = ['ALL', 'TODO', 'DONE']
  return (
    <Layout title="ToDo管理">
      <Container maxWidth="sm">
        <Input />
        <Filter />
        {statuses.map((status, index) => (
          <TodoTabPanel key={index} status={status} />
        ))}
      </Container>
    </Layout>
  )
}

export default Todo
