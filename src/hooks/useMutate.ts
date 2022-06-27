import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { QueryKeysTypes } from '../constants'

type IProps = {
  path: string
  method: string
  body?: string
  keys: QueryKeysTypes[] | QueryKeysTypes
}
export const useMutate = ({
  path,
  method,
  body,
  keys,
}: IProps): UseMutationResult<Response, unknown, void, unknown> => {
  const queryClient = useQueryClient()
  return useMutation(
    () =>
      fetch(path, {
        method: method,
        body: body,
      }),
    {
      onSuccess: () => {
        if (!Array.isArray(keys)) {
          keys = [keys]
        }
        keys.forEach((key) => {
          queryClient.invalidateQueries(key)
        })
      },
    }
  )
}
