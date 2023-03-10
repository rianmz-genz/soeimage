import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { getHomePageImages } from '../api/Image'
import ImagePreview from '../components/image/ImagePreview'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BiLoaderAlt } from 'react-icons/bi'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Banner from '../components/banner/banner'
import BannerCaption from '../components/banner/bannercaption'
import BannerSearchInput from '../components/input/BannerSearchInput'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['Home'],
    ({pageParam = 1})=>  getHomePageImages(pageParam),
    {
      getNextPageParam: (LastPage, allPages) =>
        allPages.length < Math.ceil(LastPage.totalHits / 20)
          ? allPages.length + 1
          : undefined,
    }
  )
  return (
    <>
      <Head>
        <title>SoeImage</title>
        <meta name="description" content="Dibuat oleh Adrian menggunakan nextjs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/soeimageicon.png" />
      </Head>
      <Banner>
        <BannerCaption
          title="SoeFinder"
          description="Cari dan Download Foto, ilustrasi and vector dari pixabay api"
        />
        <BannerSearchInput
          value={searchValue}
          onChange={(e) =>
            setSearchValue(e.target.value.trimStart().replace(/ +(?= )/g, ''))
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              router.push(`/search/${searchValue.trim()}`)
            }
          }}
        />
      </Banner>
      {data && (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          className="p-4 bg-[#112136]"
          dataLength={data.pages.length * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={
            <div className="w-full p-7 flex justify-center animate-spin">
              <BiLoaderAlt className="text-5xl text-gray-700" />
            </div>
          }
        >
          <Masonry
            breakpointCols={{ default: 4, 1440: 3, 1024: 2, 768: 1 }}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column"
          >
            {data.pages
              .map((group) => group.hits)
              .reduce((pre, curr) => [...pre, ...curr])
              .map((image) => (

                <ImagePreview
                  key={image.id}
                  id={image.id}
                  src={image.webformatURL}
                  heightPerWidth={image.imageHeight / image.imageWidth}
                  blurSrc={image.previewURL}
                  userImageUrl={image.userImageURL}
                  userName={image.user}
                  alt={image.tags}
                  views={image.views}
                  placeholder="blur"
                />
              ))}
          </Masonry>
        </InfiniteScroll>
      )}
    </>
  )
}
