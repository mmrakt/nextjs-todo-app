import { Input } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type IProps = {
  name: string
  placeholder?: string
  value?: string
  className?: string
  register?: UseFormRegister<FieldValues>
  rules?: any
  changeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void
  keyDownFn?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function InputField({
  name,
  placeholder,
  value,
  className,
  register,
  rules,
  changeFn,
  keyDownFn,
}: IProps): React.ReactElement {
  return (
    <>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={changeFn}
        onKeyDown={keyDownFn}
        value={value}
        className={className}
        {...register(name, rules)}
      />
    </>
  )
}

export default InputField
