import { useRouter } from "next/router"
import Image from 'next/image'
import UserPhotoProfile from "./UserPhotoProfile"
import { VscEye } from "react-icons/vsc";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from "react";
const ImagePreview = ({
    src,
    blurSrc,
    heightPerWidth,
    originalImageUrl,
    userImageUrl,
    userName,
    alt,
    id,
    views,
}) => {
    const router = useRouter()
    const fixHeight = `${heightPerWidth * 100}%`
  return (
    <li
            className="w-full h-fit  rounded-lg relative inline-block group cursor-zoom-in mb-4"
            onClick={(e)=> router.push(`/detail/${id}`)}
        >
            <Image
                className="w-full h-full"
                width={100}
                height={60}
                unoptimized={true}
                src={src}
                blurDataURL={blurSrc}
                placeholder="blur"
                alt={alt}
                quality={100}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end p-6">
                <UserPhotoProfile
                    src={userImageUrl}
                    userName={userName}
                    variant={'light'}
                />
                <div className="flex gap-2 text-white items-center">
                    <VscEye />
                    {views}
                </div>
            </div>
        </li>
  )
}

export default ImagePreview
