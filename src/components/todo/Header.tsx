import React from 'react'
import { useQueryClient } from 'react-query'
import useFilter from '../../hooks/todo/useFilter'
import DropdownMenuItem from '../common/DropdownMenuItem'

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
  const { data } = useFilter()

  const handleToggleFilterTodos = () => {
    queryClient.setQueryData(['isShowCompleted'], data ? false : true)
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
            {data ? (
              <DropdownMenuItem
                displayText="Hide completed todos"
                onClick={handleToggleFilterTodos}
              />
            ) : (
              <DropdownMenuItem
                displayText="Show completed todos"
                onClick={handleToggleFilterTodos}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
