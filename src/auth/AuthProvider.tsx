import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'

import { auth, db } from '../../functions/firebase'

interface IAuthContext {
  signinAccount:
    | {
        userId: string
        userName: string
        email: string
        profile: string
        avatarURL: string
      }
    | null
    | undefined
  setSigninAccount: React.Dispatch<any>
}
const AuthContext = React.createContext<IAuthContext>({
  signinAccount: undefined,
  setSigninAccount: undefined,
})

type IProps = {
  children?: React.ReactNode
}

function AuthProvider(props: IProps): React.ReactElement {
  const [signinAccount, setSigninAccount] = React.useState(null)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(db, 'users', user.uid))
          .then((doc) => {
            if (doc.exists()) {
              setSigninAccount(doc.data())
              localStorage.setItem(
                'signinAccount',
                JSON.stringify({
                  userName: doc.data().userName,
                  profile: doc.data().profile,
                })
              )
            } else {
              console.log('No such document!')
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signinAccount,
        setSigninAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

// 未ログインで認証が必要な画面にアクセスした際の処理
const CheckAuthenticated = (): void => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    if (!auth.currentUser) {
      router.push('/signin')
    }
  }
}

// ログイン済みでsignin/signup画面にアクセスした際の処理
const CheckUnAuthenticated = (): void => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    if (auth.currentUser) {
      router.push('/')
    }
  }
}

export { AuthContext, AuthProvider, CheckAuthenticated, CheckUnAuthenticated }
