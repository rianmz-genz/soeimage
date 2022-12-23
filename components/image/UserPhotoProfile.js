import Image from 'next/image'
import { IoMdPerson } from 'react-icons/io'
const UserPhotoProfile = ({
    src,
    userName,
    variant,
}) => {
  return (
<div className="flex gap-2 items-center">
      {src === '' ? (
        <div
          className={`flex justify-center items-center w-9 h-9 rounded-full text-xl ${
            variant === 'light'
              ? 'bg-white text-white'
              : 'bg-gray-700 text-white'
          }`}
        >
            <IoMdPerson/>
        </div>
      ) : (
        <Image
          unoptimized={true}
          src={src}
          width={35}
          height={35}
          className="rounded-full"
          alt={userName + 'photo profile'}
        />
      )}
      <p
        className={`${
          variant === 'light' ? 'text-white' : 'text-white'
        } text-base font-semibold`}
      >
        {userName}
      </p>
    </div>
  )
}

export default UserPhotoProfile
