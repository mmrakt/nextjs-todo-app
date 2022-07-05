import { AddIcon } from '@chakra-ui/icons'
import {
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import Button from './common/Button'
import ProjectList from './sideMenu/ProjectList'
import { useFetchProjects } from '@/hooks/project'
import { useCreateProject } from '@/hooks/project'

const SideMenu: React.VFC = () => {
  const { data: session }: any = useSession()
  const userId = session?.user?.id
  const queryResults = useFetchProjects(userId)
  const createProjectMutation = useCreateProject()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      name !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      onCreate()
      onClose()
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (name !== '' && !(e.nativeEvent as any).isComposing) {
      onCreate()
      onClose()
    }
  }

  const handleClose = () => {
    setName('')
    onClose()
  }

  const onCreate = () => {
    createProjectMutation.mutate({ name, userId })
  }

  return (
    <>
      <div className="w-[300px] bg-dark-825">
        <div className="mt-10 ml-10 mr-3">
          <div className="flex">
            <span className="p-2">Projects</span>
            <button
              className="ml-auto px-2 hover:bg-dark-700 rounded-md"
              onClick={onOpen}
            >
              <AddIcon />
            </button>
            {/* {isOpen && ( */}
            <Modal isOpen={isOpen} onClose={handleClose} size="3xl" isCentered>
              <ModalOverlay />
              <ModalContent bg="dark.800" className="p-5">
                <ModalBody>
                  <Stack className="">
                    <Input
                      placeholder="Add Project"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      value={name}
                      className="text-white"
                    />
                    <div className="float">
                      <Button
                        text="Add"
                        onClick={handleClick}
                        className="border-2 border-blue-500"
                        bgColor="blue"
                      />
                      <Button
                        text="Cancel"
                        onClick={handleClose}
                        className="border-2 ml-5"
                        bgColor="blackAlpha"
                      />
                    </div>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* // )} */}
          </div>
          <div>
            <ProjectList query={queryResults[0]} />
            <hr className="px-4" />
            {queryResults[1] && <ProjectList query={queryResults[1]} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu
