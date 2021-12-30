import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import MenuIcon from '@material-ui/icons/Menu'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import React from 'react'

import { formatDate } from '../../utils/date'

const HEADER_ITEMS = [
  {
    url: '/',
    icon: <MenuIcon />,
    name: 'トップ',
  },
  {
    url: `/submit/${formatDate(new Date())}`,
    icon: <NoteAddIcon />,
    name: '日報の提出',
  },
  {
    url: '/check',
    icon: <LibraryAddCheckIcon />,
    name: '提出状況確認',
  },
  {
    url: '/aggregate',
    icon: <EqualizerIcon />,
    name: '集計データ確認',
  },
  {
    url: '/todo',
    icon: <AssignmentTurnedInIcon />,
    name: 'ToDo管理',
  },
  {
    url: '/tweet',
    icon: <AssignmentTurnedInIcon />,
    name: 'タイムライン',
  },
]

export default HEADER_ITEMS
