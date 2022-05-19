import React from 'react'

const SettingIcon: React.VFC = () => {
  return (
    <div className="flex justify-end">
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
      <div className="dropdown flex justify-end">
        <SettingIcon />
        <ul
          tabIndex={0}
          className="dropdown-content menu  shadow bg-dark-800 rounded-box w-52"
        >
          <li>
            <div className="hover:bg-dark-700">hoge</div>
          </li>
          <li>
            <div className="hover:bg-dark-700">hoge</div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header
