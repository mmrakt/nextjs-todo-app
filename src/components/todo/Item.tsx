import { ListItem } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import Divider from '@material-ui/core/Divider'
import React from 'react'

type IProps = {
  text: string
  done: boolean
}
function Item({ text, done }: IProps): any {
  return (
    <>
      <ListItem>
        <Checkbox isChecked={done}>{text}</Checkbox>
      </ListItem>
      <Divider />
    </>
  )
}

export default Item
