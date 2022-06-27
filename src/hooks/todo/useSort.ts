import { useQuery } from 'react-query'
const useSort = () => {
  return useQuery(['isLatestOrder'], { enabled: false, initialData: true })
}

export default useSort
