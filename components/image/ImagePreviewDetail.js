import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
const ImagePreviewDetail = ({
    alt,
    blurSrc,
    height,
    src,
    width,
}) => {
    const [bodyWidth, setBodyWidth] = useState(0)
    useEffect(() => {
        setBodyWidth(document.body.clientWidth)
        window.addEventListener('resize', () => {
            setBodyWidth(document.body.clientWidth)
        })
    }, [])
    return (
        <div className='w-full h-full rounded-sm'>
        <Image
            unoptimized={true}
            src={src}
            alt={alt}
            width={100}
            height={60}
            layout="responsive"
            blurDataURL={blurSrc}
            placeholder={'blur'}
            loading="lazy"
            objectFit="contain"
        />
        </div>
    )
}

export default ImagePreviewDetail