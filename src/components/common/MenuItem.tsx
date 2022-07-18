import React from 'react'
import { Link } from 'react-router-dom'

type IProps = {
  displayText?: string
  to?: string
  onClick?: () => void
}

const MenuItem: React.VFC<IProps> = ({ displayText, to, onClick }) => {
  const items = () => {
    if (to && onClick) {
      return (
        <Link to={to}>
          <a>
            <div onClick={onClick}>{displayText}</div>
          </a>
        </Link>
      )
    } else if (to) {
      return (
        <Link to={to}>
          <a>{displayText}</a>
        </Link>
      )
    } else if (onClick) {
      return <div onClick={onClick}>{displayText}</div>
    } else {
      return <div>{displayText}</div>
    }
  }

  return <li className="hover:bg-dark-700">{items()}</li>
}

export default MenuItem
