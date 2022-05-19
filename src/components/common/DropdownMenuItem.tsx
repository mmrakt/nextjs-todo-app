import { MenuItem } from '@chakra-ui/react'
import React from 'react'

type IProps = {
  displayText?: string
}

const DropdownMenuItem: React.VFC<IProps> = ({ displayText }) => {
  return (
    <MenuItem bg="dark.800" _hover={{ background: 'dark.700' }}>
      {displayText}
    </MenuItem>
  )
}

export default DropdownMenuItem
