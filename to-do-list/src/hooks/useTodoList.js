import { useQuery } from "react-query";
import {request} from "../utils/axios-utils";


const fetchTodoData = ({queryKey}) => {
    const todoId = queryKey[1];
    return request({url:`Todos/${todoId}`})
}

export const useTodoList = (todoId) => {
    return useQuery(['to-do', todoId], fetchTodoData)
}