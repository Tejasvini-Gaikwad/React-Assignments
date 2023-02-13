import { ADD_USER, DELETE_USER, DELETE_USER_RED, LIST_USER ,LIST_USER_RED, UPDATE_USER, UPDATE_USER_DATA, UPDATE_USER_DATA_RED, UPDATE_USER_RED} from "./constants";
import {call, takeEvery, put} from 'redux-saga/effects';
import axios from 'axios'

function* addUserApi(post_data){
    if(post_data.data !== undefined && !('id' in post_data.data)){
        const result = yield axios.post('http://localhost:8000/users',post_data.data).then((res) => res.data).catch((error)=>{
            throw error
        })
        return result;
    }
    
}

function* addUser(post_data){
    const data = yield call(addUserApi,post_data)
    yield put({type:ADD_USER, data})
}

function* getUsersApi(){
        const result = yield axios.get('http://localhost:8000/users').then((res) => res.data).catch((error)=>{
            throw error
        })
        return result;   
}

function* getUsers(){
    const data = yield call(getUsersApi)
    yield put({type:LIST_USER_RED, data})
}

function* deleteUserApi(post_data){
    const result = yield axios.delete(`http://localhost:8000/users/${post_data.data}`).then((res) => res.data).catch((error)=>{
        throw error
    })
    return result;   
}

function* deleteUser(post_data){
const data = yield call(deleteUserApi,post_data)
yield put({type:DELETE_USER_RED, data})
}

function* updateUserApi(post_data){
    const result = yield axios.get(`http://localhost:8000/users/${post_data.data}`).then((res) => res.data).catch((error)=>{
            throw error
        })
    return result;   
}

function* updateUser(post_data){
const data = yield call(updateUserApi,post_data)
yield put({type:UPDATE_USER_RED, data})
}

function* updateUserDataApi(post_data){
    const result = yield axios.put(`http://localhost:8000/users/${post_data.data.id}`,post_data).then((res) => res.data).catch((error)=>{
            throw error
        })
    return result;   
}

function* updateUserData(post_data){
const data = yield call(updateUserDataApi,post_data)
yield put({type:UPDATE_USER_DATA_RED, data})
}

export default function* addUserSaga(){
    yield takeEvery(ADD_USER, addUser)
    yield takeEvery(LIST_USER, getUsers)
    yield takeEvery(DELETE_USER, deleteUser)
    yield takeEvery(UPDATE_USER, updateUser)
    yield takeEvery(UPDATE_USER_DATA, updateUserData)
}