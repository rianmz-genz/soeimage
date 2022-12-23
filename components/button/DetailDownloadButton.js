import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { getResolutions } from '../../utils'

const DetailDownloadButton = ({
    compressedFileExtension,
    largeImageUrl,
    mediumImageUrl,
    originalFileExtension,
    originalHeight,
    originalImageUrl,
    originalWidth,
    smallImageUrl,
}) => {
    const resolutions = getResolutions(originalWidth, originalHeight)
    const [cardVisibility, setCardVisibility] = useState(false)
    const buttonToggleRef = useRef(null)
    useEffect(() => {
        window.addEventListener('click', (e) => {
            const target = e.target
            if (buttonToggleRef.current) {
                if (
                    target !== buttonToggleRef.current &&
                    !buttonToggleRef.current.contains(target)
                ) {
                    setCardVisibility(false)
                }
            }
        })
    }, [])
    return (
        <div className="flex group h-9 relative  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 text-white min-w-[130px]">
            <a
                title="Download Image"
                download
                href={originalImageUrl}
                className="border border-r-0 border-gray-600 hover:border-gray-400 px-3 rounded-l text-sm  transition-all duration-300 flex items-center"
            >
                Download
            </a>
            <div className="h-full w-[1px] bg-gray-400 group-hover:bg-gray-600"></div>
            <button
                className="border border-l-0 border-gray-600 hover:border-gray-400 px-2 rounded-r text-xl  transition-all duration-300 flex items-center"
                title="Choose Resolution"
                onClick={() => {
                    setCardVisibility(!cardVisibility)
                }}
                ref={buttonToggleRef}
            >
                <FiChevronDown />
            </button>
            {cardVisibility ? (
                <div
                    className={`bg-gray-900 absolute right-0 -bottom-[164px] w-max rounded-md overflow-hidden py-2 select-none z-30`}
                    id="resolution-card"
                >
                    <a
                        download
                        href={smallImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Small</span>{' '}
                        <span>({resolutions.small})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={mediumImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Medium</span>{' '}
                        <span>({resolutions.medium})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={largeImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Large</span>{' '}
                        <span>({resolutions.large})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={originalImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Original</span>{' '}
                        <span>({resolutions.original})</span>
                        <span>{originalFileExtension.toUpperCase()}</span>
                    </a>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default DetailDownloadButton
