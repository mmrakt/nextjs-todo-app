import Link from 'next/link'
import React from 'react'

type IProps = {
  url: string
  name: string
  textColor: string
}

function HeaderItem(props: IProps): React.ReactElement {
  return (
    <Link href={props.url}>
      <a
        className={`px-4 py-8 font-medium text-base hover:text-black ${props.textColor}`}
      >
        {props.name}
      </a>
    </Link>
  )
}

export default HeaderItem
