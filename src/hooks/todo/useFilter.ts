import { useQuery } from 'react-query'
const useFilter = () => {
  return useQuery(['isShowCompleted'], { enabled: false, initialData: false })
}

export default useFilter
