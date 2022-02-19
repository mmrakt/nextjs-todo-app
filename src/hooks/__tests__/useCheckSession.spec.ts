import { cleanup, screen, waitFor, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useSession } from 'next-auth/react'
import { render } from '../../utils/test/utils'
import useCheckSession from '../useCheckSession'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

afterEach(cleanup)

describe('useCheckSession', () => {
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

  test('reject authenticate', async () => {
    const mockSession = {
      data: null,
      status: 'unauthenticated',
    }

    ;(useSession as jest.Mock) = jest.fn().mockReturnValue(mockSession)
    await act(async () => {
      const { result } = renderHook(() => useCheckSession())
      await waitFor(() => expect(result.current).toEqual(null))
    })
  })
})
