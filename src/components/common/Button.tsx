import { Button as ButtonElement } from '@chakra-ui/react'
import React from 'react'

type IProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void
  className?: string
  bgColor?: string
  isLoading?: boolean
  loadingText?: string
  disabledButton?: boolean
}
function Button({
  text,
  type,
  onClick,
  className,
  bgColor,
  isLoading,
  loadingText,
  disabledButton,
}: IProps): React.ReactElement {
  return (
    <ButtonElement
      type={type}
      colorScheme={bgColor}
      className={`${className}`}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
    >
      {text}
    </ButtonElement>
  )
}

export default Button
