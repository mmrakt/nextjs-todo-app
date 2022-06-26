import { Project } from '@prisma/client'
import { useQuery } from 'react-query'

const useFetchProject = (id: string) => {
  return useQuery<Project>(['projects', id], async () => {
    const res = await fetch(`/api/projects/${id}`)
    return res.json()
  })
}

export { useFetchProject }
