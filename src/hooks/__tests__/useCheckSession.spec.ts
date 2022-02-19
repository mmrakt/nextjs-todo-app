import { cleanup, screen, waitFor, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import client, { useSession } from 'next-auth/react'
import { render } from '../../utils/test/utils'
import useCheckSession from '../useCheckSession'

afterEach(cleanup)

describe('TaskItem', () => {
  test('pass authenticate', async () => {
    const mockSession = {
      data: {
        user: {
          id: '1',
          name: 'hoge',
          email: 'hoge@example.com',
        },
      },
      status: 'authenticated',
    }

    ;(useSession as jest.Mock) = jest.fn().mockReturnValue(mockSession)
    await act(async () => {
      const { result } = renderHook(() => useCheckSession())
      await waitFor(() =>
        expect(result.current).toEqual({
          authStatus: true,
          user: {
            id: '1',
            name: 'hoge',
            email: 'hoge@example.com',
          },
        })
      )
    })
  })
})
