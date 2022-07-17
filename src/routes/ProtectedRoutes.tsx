import dynamic from 'next/dynamic'
import { StrictMode } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Inbox = dynamic(() => import('../templates/inbox'))
const Settings = dynamic(() => import('../templates/setttings'))
const ProjectTodo = dynamic(() => import('../templates/[projectId]/index'))

const ProtectedRoutes = (): JSX.Element => {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:projectId" element={<ProjectTodo />} />
        </Routes>
      </Router>
    </StrictMode>
  )
}

export default ProtectedRoutes
