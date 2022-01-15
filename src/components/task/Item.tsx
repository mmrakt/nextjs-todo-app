import { ListItem } from '@chakra-ui/react'
import React from 'react'
import { useMutate } from '../../hooks/useMutate'

type IProps = {
  id: Number
  content: string
}

function Item({ id, content }: IProps): any {
  const { mutate } = useMutate({
    path: `api/tasks/${id}`,
    method: 'PATCH',
    key: 'tasks',
  })

  return (
    <>
      <ListItem>
        <div className="flex items-center my-3">
          <button
            type="button"
            className="focus:ring"
            onClick={() => {
              mutate()
            }}
          >
            <svg
              className="max-w-full w-8 inline"
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
          <span className="ml-3 text-xl">{content}</span>
        </div>
      </ListItem>
      <hr className="bg-slate-200" />
    </>
  )
}

export default Item
