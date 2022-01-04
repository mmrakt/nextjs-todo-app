import { UseMutationResult, useMutation, useQueryClient } from 'react-query'

type IProps = {
  path: string
  method: string
  body?: string
  key: string
}
export const useMutate = (
  props: IProps
): UseMutationResult<Response, unknown, void, unknown> => {
  const queryClient = useQueryClient()
  return useMutation(
    () =>
      fetch(props.path, {
        method: props.method,
        body: props.body,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(props.key)
      },
    }
  )
}
