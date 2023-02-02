import axios from 'axios';

const client = axios.create({
    baseURL:"http://localhost:8000/"
})

export const request = ({...oprions}) => {
    client.defaults.headers.common.Authorization = 'Bearer token'
    const onSuccess = response => response
    const onError = error => {
        return error
    }
    return client(oprions).then(onSuccess).catch(onError)
}