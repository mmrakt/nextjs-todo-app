import { useMutation, useQueryClient } from 'react-query'

type IProps = {
  name: string
  userId: string
}

const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ name, userId }: IProps) =>
      fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({
          name,
          userId,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects'])
      },
    }
  )
}

export { useCreateProject }
