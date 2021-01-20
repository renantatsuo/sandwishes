import axios from 'axios'

/**
 * Abstraction layer for HTTP requests.
 */
const Http = {
  get: async (url, options) => {
    const response = await axios.get(url, options)
    return {
      data: response.data,
    }
  },
}

export default Http
