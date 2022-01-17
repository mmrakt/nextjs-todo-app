import { DeleteIcon } from '@chakra-ui/icons'
import { ListItem, Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { useMutate } from '../../hooks/useMutate'
import Button from '../Button'

type IProps = {
  id: Number
  content: string
}

function Item({ id, content }: IProps): any {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editingContent, setEditingContent] = React.useState(content)

  const handleToggleInput = () => {
    setIsEditing(isEditing ? false : true)
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

  const updateContent = () => {
    updateContentMutate()
    setEditingContent(editingContent)
    setIsEditing(false)
  }

  const { mutate: updateStatusMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      done: true,
    }),
    key: 'tasks',
  })

  const { mutate: updateContentMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      content: editingContent,
    }),
    key: 'tasks',
  })

  const { mutate: deleteMutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'DELETE',
    key: 'tasks',
  })

  return (
    <>
      <ListItem>
        <div className="flex items-center my-3">
          {isEditing ? (
            <>
              <Stack className="w-full">
                <Input
                  placeholder="Change TODO"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={editingContent}
                />
                <div className="float">
                  <Button
                    text="保存"
                    onClickEvent={handleClick}
                    className="border-2 border-blue-500"
                  />
                  <Button
                    text="キャンセル"
                    onClickEvent={handleToggleInput}
                    className="bg-dark-black hover:bg-dark-lightGray border-2 border-dark-lightGray ml-5"
                  />
                </div>
              </Stack>
            </>
          ) : (
            <>
              <button
                type="button"
                className="focus:ring"
                onClick={() => {
                  updateStatusMutate()
                }}
              >
                <svg
                  className="max-w-full w-6 inline"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                >
                  <circle
                    className="fill-dark-black stroke-slate-300 transition delay-50 hover:fill-dark-gray active:fill-dark-lightGray"
                    strokeWidth="4"
                    cx="50"
                    cy="50"
                    r="48"
                  ></circle>
                </svg>
              </button>
              <div
                className="ml-3 text-xl w-full"
                onClick={() => {
                  handleToggleInput()
                }}
              >
                {content}
              </div>
              <button
                type="button"
                className="hover:bg-neutral-600"
                onClick={() => {
                  deleteMutate()
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

export default Item
