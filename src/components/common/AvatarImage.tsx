import Image from 'next/image'
import React from 'react'

type IProps = {
  imageSrc?: string
  width?: number
  height?: number
  className?: string
}

const AvatarImage: React.VFC<IProps> = ({
  imageSrc,
  width,
  height,
  className,
}) => {
  const defaultImageSrc = '/avatar.png'
  const defaultWidth = 50
  const defaultHeight = 50

  return (
    <>
      <Image
        src={imageSrc || defaultImageSrc}
        alt="avatar image"
        width={width || defaultWidth}
        height={height || defaultHeight}
        className={`rounded-full ${className}`}
      />
    </>
  )
}

export default AvatarImage
