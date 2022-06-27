import { useQuery } from 'react-query'
const useFilter = () => {
  return useQuery(['isShowArchived'], { enabled: false, initialData: true })
}

export default useFilter
