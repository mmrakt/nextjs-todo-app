import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useMutate } from '../useMutate'
import { QueryKeysTypes } from '@/constants'

describe('useMutate', () => {
  test('return useMutation', () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const props: {
      path: string
      method: string
      keys: QueryKeysTypes[] | QueryKeysTypes
    } = {
      path: '/api/hoge',
      method: 'GET',
      keys: 'tasks',
    }

    const { result } = renderHook(() => useMutate(props), { wrapper })
    expect(result.current).toHaveProperty('mutate')
  })
})
