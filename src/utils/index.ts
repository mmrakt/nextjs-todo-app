import { useMemo } from 'react'

export const useClassName = (
  ...names: ReadonlyArray<string | undefined>
): string => useMemo(() => names.filter((name) => !!name).join('　'), [names])
