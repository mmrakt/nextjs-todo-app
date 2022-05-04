import { DeleteIcon } from '@chakra-ui/icons'
import {
  ListItem,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useMutate } from '../../hooks/useMutate'
import Button from '../common/Button'
import CircleCheckbox from '../common/CircleCheckbox'

type IProps = {
  id: number
  content: string
  isCompleted: boolean
}

function Row({ id, content, isCompleted }: IProps): any {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingContent, setEditingContent] = React.useState(content)
  const queryClient = useQueryClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditingContent(e.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      editingContent !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      updateContent()
      onClose()
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (editingContent !== '' && !(e.nativeEvent as any).isComposing) {
      updateContent()
      onClose()
    }
  }

  const handleStatusMutate = () => {
    // タスクが完了済みの場合はnullにする
    const completedAt = isCompleted ? null : dayjs().format()
    updateStatusMutate(completedAt)
  }

  const { mutate: updateStatusMutate } = useMutation(
    (completedAt: string) =>
      fetch(`api/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isCompleted: !isCompleted,
          completedAt,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.resetQueries('tasks')
        queryClient.resetQueries('completedTasks')
      },
    }
  )

  const updateContent = () => {
    updateContentMutate()
    setEditingContent(editingContent)
  }

  const { mutate: updateContentMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      content: editingContent,
    }),
    keys: 'tasks',
  })

  const { mutate: deleteUncompletedMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'DELETE',
    keys: 'tasks',
  })

  const { mutate: deleteCompletedMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'DELETE',
    keys: 'completedTasks',
  })

  return (
    <>
      <ListItem>
        <div className="flex items-center my-3">
          {isOpen ? (
            <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
              <ModalOverlay />
              <ModalContent bg="dark.800" className="p-5">
                <ModalBody>
                  <Stack className="">
                    <Input
                      placeholder="Change TODO"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      value={editingContent}
                      className="text-white"
                    />
                    <div className="float">
                      <Button
                        text="Save"
                        onClick={handleClick}
                        className="border-2 border-blue-500"
                        bgColor="blue"
                      />
                      <Button
                        text="Cancel"
                        onClick={onClose}
                        className="border-2 ml-5"
                        bgColor="blackAlpha"
                      />
                    </div>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          ) : (
            <></>
          )}
          <CircleCheckbox
            isCompleted={isCompleted}
            onClick={() => {
              handleStatusMutate()
            }}
          />
          {isCompleted ? (
            <>
              <div className="ml-3 text-xl w-full" onClick={onOpen}>
                <span className="line-through text-neutral-500">
                  {editingContent}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="ml-3 text-xl w-full" onClick={onOpen}>
                {editingContent}
              </div>
            </>
          )}
          <button
            type="button"
            className="hover:bg-neutral-600 active:animate-ping active:animation-delay-500"
            onClick={() => {
              isCompleted ? deleteCompletedMutate() : deleteUncompletedMutate()
            }}
          >
            <DeleteIcon className="p-1" boxSize={6} />
          </button>
        </div>
      </ListItem>
      <hr className="border-dark-700" />
    </>
  )
}

export default Row
