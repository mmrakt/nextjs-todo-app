import React from 'react'
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
            <DropdownMenuItem displayText="Show completed todos" />
            <DropdownMenuItem displayText="fuga" />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
