import axios from 'axios'
import store from './../store'

const httpClient = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    // timeout: 5000
})

httpClient.interceptors.request.use(request => {

    store.commit('app/loading', true)

    request.params = {
        ...request.params,
        ts: 1,
        apikey: process.env.VUE_APP_MARVEL_PUBLIC_KEY,
        hash: process.env.VUE_APP_MARVEL_HASH
    }

    return request
}, error => {
    console.log('error: ', error)
    return Promise.reject(error)
})

httpClient.interceptors.response.use(response => {
    store.commit('app/loading', false)
    return response.data
}, error => {
    store.commit('app/loading', false)
    return Promise.reject(error)
})

export default httpClient
