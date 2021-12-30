import { Menu, MenuItem } from '@material-ui/core'
import React from 'react'

type IProps = {
  isOpenModal: Element
  toggleModal: (boolean) => void
  children: React.ReactNode
}

function MenuList(props: IProps): React.ReactElement {
  const { isOpenModal, toggleModal, children } = props

  const handleModalClose = () => {
    toggleModal(null)
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={isOpenModal}
      keepMounted
      open={Boolean(isOpenModal)}
      onClose={handleModalClose}
    >
      {children}
    </Menu>
  )
}

export default MenuList
