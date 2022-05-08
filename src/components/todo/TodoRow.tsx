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
import React from 'react'
import Button from '../common/Button'
import CircleCheckbox from '../common/CircleCheckbox'
import { Todo } from '@/libs/prisma'

type IProps = {
  handleDelete: (todo: Todo) => void
  handleUpdateStatus: (todo: Todo) => void
  handleUpdateContent: (todo: Todo, content: string) => void
  todo: Todo
}

function TodoRow({
  handleDelete,
  handleUpdateStatus,
  handleUpdateContent,
  todo,
}: IProps): any {
  const { id, content, isCompleted } = todo
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingContent, setEditingContent] = React.useState(content)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditingContent(e.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      editingContent !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      onUpdateContent()
      onClose()
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (editingContent !== '' && !(e.nativeEvent as any).isComposing) {
      onUpdateContent()
      onClose()
    }
  }

  const onUpdateContent = () => {
    handleUpdateContent(todo, editingContent)
    setEditingContent(editingContent)
  }

  const onUpdateStatus = () => {
    handleUpdateStatus(todo)
  }

  const onDelete = () => {
    handleDelete(todo)
  }

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
          <CircleCheckbox isCompleted={isCompleted} onClick={onUpdateStatus} />
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
            onClick={onDelete}
          >
            <DeleteIcon className="p-1" boxSize={6} />
          </button>
        </div>
      </ListItem>
      <hr className="border-dark-700" />
    </>
  )
}

export default TodoRow
