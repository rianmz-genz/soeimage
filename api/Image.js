import axios from "axios";

    export const getHomePageImages = async (page) => {
        const response = await axios.get(
            `https://pixabay.com/api/?key=31155458-5d22b11815ebc66f63eccec0d&page=${page}&safesearch=true`
          )
          return response.data 
    }

    export const getImageDetail =  async (id) => {
      console.log(id)
        const response = await axios.get(
          `https://pixabay.com/api/?key=31155458-5d22b11815ebc66f63eccec0d&id=${id}`
        )
        return response.data.hits[0]
      }
    
