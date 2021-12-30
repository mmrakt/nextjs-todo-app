import { Button } from '@material-ui/core'
import { fbAuth, fbDb } from 'functions/firebase'
import React from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../../auth/AuthProvider'
import ProtectedRoute from '../../../auth/ProtectedRoute'
import Layout from '../../../components/layout'

const Container = styled.p`
  text-align: center;
`

function DeleteAccount(): React.ReactElement {
  const { signinAccount } = React.useContext(AuthContext)

  const onDeleteAccount = async (): Promise<void> => {
    try {
      await deleteAccountOnFbDB()
      deleteAccountOnFbAuth()
      location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAccountOnFbDB = (): void => {
    fbDb
      .collection('users')
      .doc(fbAuth.currentUser.uid)
      .delete()
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteAccountOnFbAuth = (): void => {
    fbAuth.currentUser.delete().catch((error) => {
      console.log(error)
    })
    fbAuth.signOut()
  }

  return (
    <ProtectedRoute>
      <Layout title="アカウント削除">
        {signinAccount && (
          <Container>
            <span>
              アカウントを削除すると二度と元に戻せません。十分ご注意ください。
            </span>
            <Button
              variant="contained"
              color="secondary"
              onClick={onDeleteAccount}
            >
              削除する
            </Button>
          </Container>
        )}
      </Layout>
    </ProtectedRoute>
  )
}
export default DeleteAccount
