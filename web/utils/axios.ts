import axios from 'axios'
import { __prod__ } from '../constants'
const instance = axios.create({
    baseURL: __prod__ === true ? "https://api.costify.ga" : "http://localhost:4000"
})

export default instance;