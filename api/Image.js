import axios from "axios";

    export const getHomePageImages = async (page) => {
        const response = await axios.get(
            `https://pixabay.com/api/?key=31155458-5d22b11815ebc66f63eccec0d&page=${page}&safesearch=true`
          )
          return response.data 
    }

    export const getImageDetail =  async (id) => {
        const response = await axios.get(
          `https://pixabay.com/api/?key=31155458-5d22b11815ebc66f63eccec0d&id=${id}`
        )
        return response.data.hits[0]
      }
    export const getSearchImage = async (keyword, filters, page) => {
      const response = await axios.get(
        `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&page=${page}&q=${keyword}&safesearch=true&order=${filters?.sortBy}&orientation=${filters?.orientation}&image_type=${filters?.imageType}&category=${filters?.category}&min_width=${filters?.minimumWidth}&min_height=${filters?.minimumHeight}&colors=${filters?.colors}`
      )
      return response.data
    }
