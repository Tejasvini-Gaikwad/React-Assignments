import { ADD_USER, DELETE_USER_RED, LIST_USER,LIST_USER_RED ,UPDATE_USER_DATA,UPDATE_USER_DATA_RED,UPDATE_USER_RED} from "../constants";

const initialState = {
    data : null,
    isLoading : true,
    isError : false,
    error:''
}
export const userData = (data=initialState, action) => {
    const action_data = action.data;
    switch(action.type){
        case ADD_USER :   
                return {...data,data:action_data}
        case LIST_USER_RED : 
                return {...data,data:action_data}
        case DELETE_USER_RED : 
                const remainingItems = data.data.filter(res=> res.id !== action.data.id)
                return {...data}   
        case UPDATE_USER_RED :
                return {...data,data:action_data}
        case UPDATE_USER_DATA_RED :
                return {...data,data:action_data}
        default :
            return data
    }
}