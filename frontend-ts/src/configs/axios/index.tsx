import axios from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`
})

instance.interceptors.response.use( (response) => response.data,)

export default instance