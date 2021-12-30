import MenuIcon from '@material-ui/icons/Menu'
import { cleanup } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

import Drawer from '../header/drawer'
import DrawerItem from '../header/drawerItem'
import MenuList from '../header/menuList'

afterEach(cleanup)

// describe('Header', () => {
//     const component = renderer.create(<Header />)
//     const tree = component.toJSON()

//     expect(tree).toMatchSnapshot()
// })

test('DrawerItem', () => {
  const component = renderer.create(
    <DrawerItem href="/" icon={<MenuIcon />} listItemText="トップメニュー" />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('Drawer', () => {
  const component = renderer.create(
    <Drawer isOpenDrawer={false} handleClose={jest.fn()} />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('MenuList', () => {
  const component = renderer.create(<MenuList />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
