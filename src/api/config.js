import axios from 'axios'

//api для prod с ssl
// const API_URL = 'https://students.forus.ru/api/'

//api для dev
//const API_URL = 'http://localhost:3000/api'

//api для test
const API_URL = 'https://new.arenda-uni.ru/api/'

// create an axios instance
const service = axios.create({
  baseURL: API_URL, //process.env.SERVER_URL,
  timeout: 5000, // request timeout
  withCredentials: false,
})

export default service
