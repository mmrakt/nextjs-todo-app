import { Button as ButtonElement } from '@chakra-ui/react'
import React from 'react'

type IProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClickEvent?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void
  className?: string
  isLoading?: boolean
  loadingText?: string
  disabledButton?: boolean
}
function Button({
  text,
  type,
  onClickEvent,
  className,
  isLoading,
  loadingText,
  disabledButton,
}: IProps): React.ReactElement {
  return (
    <ButtonElement
      type={type}
      className={className}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClickEvent}
    >
      {text}
    </ButtonElement>
  )
}

export default Button
