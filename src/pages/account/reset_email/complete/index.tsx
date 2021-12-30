import { CssBaseline, Container, Typography } from '@material-ui/core'
import React from 'react'

import { AuthContext } from '../../../../auth/AuthProvider'
import ProtectedRoute from '../../../../auth/ProtectedRoute'
import Layout from '../../../../components/layout'

function Complete(): React.ReactElement {
  const { signinAccount } = React.useContext(AuthContext)
  return (
    <ProtectedRoute>
      <Layout title="確認用メール送信完了">
        {signinAccount && (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <p>アカウント情報を変更しました。</p>
            <p>確認用メールのURLより本人確認をおこなってください。</p>
            <Typography component="p" color="inherit" noWrap>
              {signinAccount.email}
            </Typography>
          </Container>
        )}
      </Layout>
    </ProtectedRoute>
  )
}
export default Complete
