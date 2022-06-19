import React from 'react'
import { useQueryClient } from 'react-query'
import { TODO_STATUSES } from '../../constants/index'
import useFilter from '../../hooks/todo/useFilter'
import useSort from '../../hooks/todo/useSort'
import MenuItem from '../common/MenuItem'

const SettingIcon: React.VFC = () => {
  return (
    <div>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            transform="translate(3 10)"
          >
            <circle cx="2" cy="2" r="2"></circle>
            <circle cx="9" cy="2" r="2"></circle>
            <circle cx="16" cy="2" r="2"></circle>
          </g>
        </svg>
      </button>
    </div>
  )
}

const Header: React.VFC = () => {
  const queryClient = useQueryClient()
  const { data: isShowCompleted } = useFilter()
  const { data: isLatestOrder } = useSort()

  const handleToggleFilterTodos = () => {
    queryClient.setQueryData(
      ['isShowCompleted'],
      isShowCompleted ? false : true
    )
  }

  const handleToggleSortTodos = () => {
    queryClient.setQueryData(['isLatestOrder'], isLatestOrder ? false : true)
    queryClient.resetQueries([
      'todos',
      { status: TODO_STATUSES['isNotCompleted'] },
    ])
  }

  return (
    <>
      <div className="flex justify-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <SettingIcon />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-dark-800 rounded-box w-52"
          >
            {isShowCompleted ? (
              <MenuItem
                displayText="Hide completed todos"
                onClick={handleToggleFilterTodos}
              />
            ) : (
              <MenuItem
                displayText="Show completed todos"
                onClick={handleToggleFilterTodos}
              />
            )}
            {isLatestOrder ? (
              <MenuItem
                displayText="Sort by Oldest order"
                onClick={handleToggleSortTodos}
              />
            ) : (
              <MenuItem
                displayText="Sort by Latest order"
                onClick={handleToggleSortTodos}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
