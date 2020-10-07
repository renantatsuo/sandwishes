import axios from 'axios'

/**
 * Abstraction layer for HTTP requests.
 */
const Http = {
  get: async (url) => {
    const response = await axios.get(url)
    return {
      data: response.data,
    }
  },
}

export default Http
