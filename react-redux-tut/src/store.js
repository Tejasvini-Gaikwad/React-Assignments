import { configureStore } from "@reduxjs/toolkit";
import {rootReducers} from './reducers/index.js'
import createSagaMiddleware from "@redux-saga/core";
import userSaga from "./userSaga";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer:rootReducers,
    middleware:()=>[sagaMiddleware]
})

sagaMiddleware.run(userSaga)
