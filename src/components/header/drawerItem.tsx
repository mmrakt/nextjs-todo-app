import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

type IProps = {
  href: string
  icon: React.ReactElement
  listItemText: string
}
function DrawerItem(props: IProps): React.ReactElement {
  const { href, icon, listItemText } = props
  return (
    <Link href={href}>
      <ListItem button>
        <ListItemAvatar>{icon}</ListItemAvatar>
        <ListItemText>{listItemText}</ListItemText>
      </ListItem>
    </Link>
  )
}
export default DrawerItem
