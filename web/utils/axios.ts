import axios from 'axios'
import { __prod__ } from '../constants'
const instance = axios.create({
    baseURL: __prod__? process.env.NEXT_PUBLIC_URL : "http://localhost:4000"
});
export default instance;