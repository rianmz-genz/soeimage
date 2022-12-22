import { useEffect, useState } from "react"
import { getImageDetail, getHomePageImages } from "../../api/Image"
import axios from "axios"
import { useRouter } from "next/router"

const BlogsDetail = () => { 
  const router = useRouter()
  const [detailData, setDetailData] = useState({})
  useEffect(() => {
    const GetDetail = async () => {
      await getImageDetail(router.query.id).then(res => {
        setDetailData(res)
      })
    }
    GetDetail()
    console.log(detailData)
  }, [])
  
  return (
    <div>
    </div>
  )
}
export default BlogsDetail
