import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const toDosList = (params) => {
    return axios.get(`http://localhost:8000/Todos`, {params});
}

const addTodo = (todos_data) => {
    return axios.post(`http://localhost:8000/Todos`,todos_data);
}

export const useTodosList = (params) => {
        return useQuery(["todos", params.pageNumber],()=>toDosList(params));
}

export const useAddTodo = () => {
    return useMutation(addTodo)
}

const updateTodo = async (params) => {
    return await axios.put(`http://localhost:8000/Todos/${params.id}`,params);
}

export const useUpdateTodo = () => {
    const queryClient = new QueryClient()
    return useMutation(updateTodo, {
        onSuccess : () => {
            queryClient.invalidateQueries('todos')
        }
    })
}