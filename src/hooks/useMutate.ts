import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { QueryKeysTypes } from '../constants/queryKeys'

type IProps = {
  path: string
  method: string
  body?: string
  key: QueryKeysTypes
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
