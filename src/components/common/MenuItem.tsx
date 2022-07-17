import Link from 'next/link'
import React from 'react'
// import { Link } from 'react-router-dom'

type IProps = {
  displayText?: string
  href?: string
  onClick?: () => void
}

const MenuItem: React.VFC<IProps> = ({ displayText, href, onClick }) => {
  const items = () => {
    if (href && onClick) {
      return (
        <Link href={href}>
          <a>
            <div onClick={onClick}>{displayText}</div>
          </a>
        </Link>
      )
    } else if (href) {
      return (
        <Link href={href}>
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
