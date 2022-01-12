import { ListItem } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import Divider from '@material-ui/core/Divider'
import React from 'react'

type IProps = {
  content: string
  done: boolean
}

function Item({ content, done }: IProps): any {
  return (
    <>
      <ListItem>
        <Checkbox isChecked={done}>{content}</Checkbox>
      </ListItem>
      <Divider />
    </>
  )
}

export default Item
