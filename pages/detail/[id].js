import { useEffect, useState } from "react";
import { getImageDetail, getHomePageImages } from "../../api/Image";
import axios from "axios";
import { useRouter } from "next/router";
import { BiLoaderAlt } from "react-icons/bi";
import UserPhotoProfile from "../../components/image/UserPhotoProfile";
import Head from "next/head";
import ImagePreviewDetail from "../../components/image/ImagePreviewDetail";
import Link from "next/link";
import Header from "../../components/header/Header";
import HeaderSearchInput from "../../components/input/HeaderSearchInput";
import { VscEye } from "react-icons/vsc";
import { FiDownloadCloud, FiSearch } from "react-icons/fi";
import {
  getCompressedImageExtension,
  getDownloadUrl,
  getOriginalImageExtension,
} from '../../utils'
import DetailDownloadButton from "../../components/button/DetailDownloadButton";
import Footer from "../../components/footer/Footer";

const BlogsDetail = () => {
  const router = useRouter();
  const [image, setImage] = useState({});
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    if (router.isReady) {

      const GetDetail = async () => {
        await getImageDetail(router.query.id).then((res) => {
          setImage(res);
        });
      };
      GetDetail();
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }

  }, [router.isReady]);


  return (
    <>
      {loader ? (
        <div className="w-full items-center bg-[#112136] h-screen flex justify-center">
          <BiLoaderAlt className="text-5xl text-white  animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col pt-32 bg-[#112136] items-center p-4  min-h-screen">
      <Head>
        <title>Detail gambar {image.user}</title>
        <meta name="description" content="Dibuat oleh Adrian menggunakan nextjs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/soeimageicon.png" />
      </Head>
        <div className="w-full max-w-[1024px] flex flex-col gap-4 items-center">
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
          <div className="flex justify-between items-center w-full">
            <UserPhotoProfile
              src={image.userImageURL}
              userName={image.user}
              variant="dark"
            />
            <DetailDownloadButton
              originalWidth={image.imageWidth}
              originalHeight={image.imageHeight}
              compressedFileExtension={getCompressedImageExtension(image)}
              originalFileExtension={getOriginalImageExtension(image)}
              smallImageUrl={getDownloadUrl(image).small}
              mediumImageUrl={getDownloadUrl(image).medium}
              largeImageUrl={getDownloadUrl(image).large}
              originalImageUrl={getDownloadUrl(image).original}
            />
          </div>
          <div
            className={`w-full ${
              image.imageWidth > image.imageHeight ? '' : 'max-w-[700px]'
            }`}
          >
            <ImagePreviewDetail
              src={image.largeImageURL}
              alt={image.tags}
              width={image.imageWidth}
              height={image.imageHeight}
              blurSrc={image.previewURL}
              placeholde="blur"
            />
          </div>
         <div className="flex justify-between w-full max-sm:flex-col max-sm:gap-3 max-sm:justify-start items-center">   
          <div className="flex gap-4 w-full">
              <div className="flex items-center gap-2  text-white">
                <VscEye />
              <p className="text-base">{image.views}</p>
              </div>
              <div className="flex items-center gap-2  text-white">
                <FiDownloadCloud />
              <p className="text-base">{image.downloads}</p>
              </div>
          </div>
          <div className="flex gap-2 w-full justify-end max-sm:justify-start">
            {image.tags.split(', ').map((tag) => (
              <Link href={`/search/${tag}`} key={tag}>
                <div className="text-white bg-gray-700 items-center gap-1 hover:bg-gray-800 px-4 py-1.5 rounded-full text-sm cursor-pointer flex">
                 <FiSearch/>
                 <p> {tag}</p>
                </div>
              </Link>
            ))}
          </div>
          </div>
          <Footer/>
        </div>
      </div>
      )}
    </>
  );
};
export default BlogsDetail;

// export const getServerSideProps = async (context) => {
//   const id = context.params?.id;

//   try {
//     const image = await getImageDetail(id).then((res) => {
//       console.log(res);
//       return { res };
//     });
//     console.log(image)
//     return{
//       image,
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
