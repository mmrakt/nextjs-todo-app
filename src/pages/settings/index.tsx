import { useToast, UseToastOptions } from '@chakra-ui/react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useQueryClient, useMutation } from 'react-query'
import Layout from '../../components/Layout'
import Button from '../../components/common/Button'
import { InputField, TextareaField } from '../../components/common/InputField'
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
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  })
  const queryClient = useQueryClient()
  const router = useRouter()
  const toast = useToast()

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
      toast({
        title: 'Success!',
        position: 'top-left',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        position: 'top-left',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      router.push('/settings')
    }
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
          <div className="class flex items-center">
            <Image
              src={userInfo.image ? userInfo.image : '/avatar.png'}
              alt="avater image"
              width={100}
              height={100}
              className="rounded-[50%]"
            />
            <button className="btn normal-case ml-5">
              <label htmlFor="file">
                Upload File
                <input
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </label>
            </button>
          </div>
          <AvatalTrimmingModal
            modalIsOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            src={src}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
              <div className="">
                <label htmlFor="name" className="">
                  Name
                </label>
                <InputField
                  name="name"
                  className="mt-2"
                  register={register}
                  rules={{
                    required: true,
                    maxLength: 20,
                  }}
                />
                <span className="text-white">
                  {errors.name?.type === 'required' && 'Name is required'}
                  {errors.name?.type === 'maxLength' &&
                    'Name exceeds 20 characters.'}
                </span>
              </div>
              {/* TODO: profileの型がunknownになる理由を調べる */}
              <div className="mt-5">
                <label htmlFor="profile" className="class">
                  Profile
                </label>
                <TextareaField
                  className="mt-2 outline-black"
                  name="profile"
                  register={register}
                />
              </div>
              <div className="mt-10 float-right">
                <Button
                  type="submit"
                  text="Update"
                  className="text-black"
                  bgColor="blue"
                  isLoading={isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  )
}
export default Settings
