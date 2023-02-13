import { ADD_USER, DELETE_USER, LIST_USER,UPDATE_USER ,UPDATE_USER_DATA} from "../constants";

export const addUser = (data) => {
    return {
        type:ADD_USER,
        data
    }
}

export const getUsersList = () => {
    return {
        type:LIST_USER,
    }
}

export const deleteUser = (data) => {
    return {
        type:DELETE_USER,
        data
    }
}

export const updateUser = (data) => {
    return {
        type : UPDATE_USER,
        data
    }
}

export const updateUserData = (data) => {
    return {
        type : UPDATE_USER_DATA,
        data
    }
}
