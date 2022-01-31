import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Router from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useQueryClient, useMutation } from 'react-query'
import Button from '../../components/Button'
import InputField from '../../components/common/InputField'
import Layout from '../../components/layout'
import 'react-image-crop/dist/ReactCrop.css'

import AvatalTrimmingModal from './AvatarTrimmingModal'

type Inputs = {
  name: string
  profile: string
}

function Settings(): React.ReactElement {
  const { data: session } = useSession()
  const [userInfo, setUserInfo] = useState<User | null>()
  const [src, setSrc] = useState<any>(null)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  })
  const queryClient = useQueryClient()
  React.useEffect(() => {
    setValue('name', session?.user.name)
    setValue('profile', session?.user.profile)
    setUserInfo(session?.user)
  }, [session])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setSrc(reader.result)
        setModalIsOpen(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    profile,
  }): Promise<void> => {
    try {
      await updateUserInfoMutate({ name, profile })
      await updateUserInfoOnLocalStorage({ name, profile })
    } catch (error) {
      console.error(error)
    }

    Router.push(`/settings/${userInfo?.id}`)
  }

  const { mutate: updateUserInfoMutate } = useMutation(
    ({ name, profile }: Inputs) =>
      fetch(`/api/users/${userInfo?.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          profile,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const updateUserInfoOnLocalStorage = ({ name, profile }: Inputs) => {
    localStorage.setItem(
      'signinUser',
      JSON.stringify({
        name,
        profile,
      })
    )
  }

  return (
    <Layout>
      {userInfo && (
        <div>
          <Image
            src={userInfo.image ? userInfo.image : 'avatar.png'}
            alt="avater image"
            width={100}
            height={100}
            className="rounded-[50%]"
          />
          <div>
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </div>
          <AvatalTrimmingModal
            modalIsOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            src={src}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputField
                name="name"
                register={register}
                rules={{
                  required: true,
                }}
              />
              {errors.firstName?.type === 'required' && 'Name is required'}
              {/* TODO: profileの型がunknownになる理由を調べる */}
              <InputField name="profile" register={register} />
            </div>
            <Button type="submit" text="register" />
          </form>
        </div>
      )}
    </Layout>
  )
}
export default Settings
