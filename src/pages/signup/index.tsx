// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   Link,
//   Grid,
//   makeStyles,
//   Container,
// } from '@material-ui/core'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
// import { db } from 'functions/firebase'
// import { useRouter } from 'next/router'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useMutation } from 'react-query'

// import { AuthContext } from '../../auth/AuthProvider'
// import TextFieldEl from '../../components/grid/textFieldEl'
// import Layout from '../../components/layout'
// import { vldRules } from '../../utils/validationRule'

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }))

// function Signup(): React.ReactElement {
//   const router = useRouter()
//   const classes = useStyles()
//   const { signinAccount } = React.useContext(AuthContext)

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState<boolean>(true)

//   const { register, handleSubmit, errors } = useForm({
//     mode: 'onChange',
//     criteriaMode: 'all',
//   })
//   const onSubmit = (data) => console.log(data)

//   if (signinAccount) {
//     if (typeof window !== 'undefined') {
//       router.push('/')
//     }
//   }

//   const onSignup = async (): Promise<void> => {
//     setLoading(false)
//     if (email && password && loading) {
//       try {
//         await signup()
//         router.push('/')
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(true)
//       }
//     }
//   }

//   const signup = () => {
//     const auth = getAuth()
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const { user } = userCredential
//         createUser(user)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }

//   const createUser = async (user) => {
//     await setDoc(doc(db, 'users', user.uid), {
//       email: user.email,
//     })
//   }

//   return (
//     <Layout title="ユーザー登録">
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar} />
//           <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
//             <Grid container spacing={2}>
//               <TextFieldEl
//                 id="email"
//                 label="Eメールアドレス"
//                 name="email"
//                 autoComplete="email"
//                 type="text"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setEmail(e.target.value)
//                 }}
//                 inputRef={register({
//                   required: vldRules.required,
//                   pattern: vldRules.checkEmail,
//                 })}
//                 error={Boolean(errors.email)}
//                 errors={errors}
//               />
//               <TextFieldEl
//                 name="orgPassword"
//                 label="パスワード"
//                 type="password"
//                 id="orgPassword"
//                 autoComplete="current-password"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setPassword(e.target.value)
//                 }}
//                 inputRef={register({
//                   required: vldRules.required,
//                   minLength: vldRules.checkMinLength,
//                   pattern: vldRules.checkAlphanumeric,
//                 })}
//                 error={Boolean(errors.password)}
//                 errors={errors}
//                 render={({ messages }) =>
//                   messages &&
//                   Object.entries(messages).map(([type, message]) => (
//                     <p key={type}>{message}</p>
//                   ))
//                 }
//               />
//               <TextFieldEl
//                 name="confirmPassword"
//                 label="パスワード確認"
//                 type="password"
//                 id="confirmPassword"
//                 autoComplete="current-password"
//                 inputRef={register({
//                   required: vldRules.required,
//                   validate: (value) =>
//                     password === value || '確認用パスワードが一致しません。',
//                 })}
//                 error={Boolean(errors.confirmPassword)}
//                 errors={errors}
//               />
//             </Grid>
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//               onClick={onSignup}
//             >
//               登録
//             </Button>
//             <Grid container justify="flex-end">
//               <Grid item>
//                 <Link href="/signin" variant="body2">
//                   すでにアカウントをお持ちですか？ログイン
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//     </Layout>
//   )
// }

// export default Signup
