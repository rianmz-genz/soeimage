import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter,useEffect } from 'next/router'
import { getSearchImage } from '../../api/Image'
import ImagePreview from '../../components/image/ImagePreview'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BiLoaderAlt } from 'react-icons/bi'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Banner from '../../components/banner/banner'
import BannerCaption from '../../components/banner/bannercaption'
import BannerSearchInput from '../../components/input/BannerSearchInput'
import Header from '../../components/header/Header'
import HeaderSearchInput from '../../components/input/HeaderSearchInput'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const keyword = router.query.keyword;

  const defaultFilters = {
    sortBy: 'popular',
    orientation: '',
    imageType: 'all',
    category: '',
    minimumWidth: '0',
    minimumHeight: '0',
    colors: '',
  }
  const [filters, setFilters] = useState(defaultFilters)
  const [minimumWidth, setMinimumWidth] = useState('0')
  const [minimumHeight, setMinimumHeight] = useState('0')
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['SearchImage', keyword, filters],
    ({ pageParam = 1 }) =>
      getSearchImage(keyword ?? '', filters, pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < Math.ceil(lastPage.totalHits / 20)
          ? allPages.length + 1
          : undefined,
    }
  )

  return (
    <>
      <Head>
        <title>Mencari {keyword}</title>
        <meta name="description" content="Dibuat oleh Adrian menggunakan nextjs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/soeimageicon.png" />
      </Head>
      <Header>
            <HeaderSearchInput
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
          </Header>
      {data && (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          className="p-4 bg-[#112136] pt-24  min-h-screen"
          dataLength={data.pages.length * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={
            <div className="w-full p-7 flex justify-center animate-spin">
              <BiLoaderAlt className="text-5xl text-gray-700" />
            </div>
          }
        >
          {data.pages.map((group)=> {
            if(group.hits.length == 0){
              return <p className='text-white mb-3'> Hasil pencarian dari {keyword} ngga ada</p>
            }else{
              return <p className='text-white mb-3'> Hasil pencarian dari {keyword}</p>
            }
          })}
            
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