import { DeleteIcon } from '@chakra-ui/icons'
import { ListItem, Input, Stack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { useCallback, useEffect } from 'react'
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
  const [isEditing, setIsEditing] = React.useState(false)
  const [editingContent, setEditingContent] = React.useState(content)
  const queryClient = useQueryClient()

  const handleToggleInput = (event) => {
    setEditingContent(content)
    openModal(event)
  }

  const closeModal = useCallback(() => {
    setIsEditing(false)
    document.removeEventListener('click', closeModal)
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeModal)
    }
  }, [closeModal])

  const openModal = (event) => {
    setIsEditing(true)
    document.addEventListener('click', closeModal)
    event.stopPropagation()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditingContent(e.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      editingContent !== '' &&
      !(e.nativeEvent as any).isComposing
    ) {
      updateContent()
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (editingContent !== '' && !(e.nativeEvent as any).isComposing) {
      updateContent()
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
    setIsEditing(false)
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
          {isEditing ? (
            <div
              id="modal"
              className="absolute flex justify-center content-center items-center h-full bg-[rgba(0, 0, 0, 5)]"
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <Stack className="w-full">
                <Input
                  placeholder="Change TODO"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={editingContent}
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
                    onClick={closeModal}
                    className="border-2 ml-5"
                    bgColor="blackAlpha"
                  />
                </div>
              </Stack>
            </div>
          ) : (
            <>
              <CircleCheckbox
                isCompleted={isCompleted}
                onClick={() => {
                  handleStatusMutate()
                }}
              />
              {isCompleted ? (
                <>
                  <div
                    className="ml-3 text-xl w-full"
                    onClick={(event) => {
                      handleToggleInput(event)
                    }}
                  >
                    <span className="line-through text-neutral-500">
                      {editingContent}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="ml-3 text-xl w-full"
                    onClick={(event) => {
                      handleToggleInput(event)
                    }}
                  >
                    {editingContent}
                  </div>
                </>
              )}
              <button
                type="button"
                className="hover:bg-neutral-600 active:animate-ping active:animation-delay-500"
                onClick={() => {
                  isCompleted
                    ? deleteCompletedMutate()
                    : deleteUncompletedMutate()
                }}
              >
                <DeleteIcon className="p-1" boxSize={6} />
              </button>
            </>
          )}
        </div>
      </ListItem>
      <hr className="bg-slate-200" />
    </>
  )
}

export default Row
