import React,{ useEffect, useState } from "react";
// import { useQuery } from "react-query";
import axios from 'axios';
// import useFetch from "react-fetch-hook";
import ListTodo from "./ListTodo";
import { useTodosList, useUpdateTodo } from "./hooks/useTodosList";

const pageSize = 10;
const Todo = ({list,setList}) =>{
    const [pageNumber, setPageNumber] = useState(1);
    const {isLoading, data, isError, error, refetch} = useTodosList({_limit:pageSize, _page:pageNumber});
    
    const {mutate : updateTodos} = useUpdateTodo();
    useEffect(()=>{
        refetch();
    },[pageNumber])
    
    useEffect(()=>{
      if(data){
        setList(data.data);
      }
    }, [data, pageNumber])
   
    const deleteCompletedItems = (ids) => {
        const newArr = list.filter((data)=>{
            if(ids.includes(data.id)){
                axios.delete("http://localhost:8000/Todos/"+data.id);
                refetch();
            }else{
                return data;  
            }
        })
        setList(newArr);
    }

     //function to update single item
    const updateCompleted = (ids) => {
        const newArrUpdate = list.map(data => {
            if (ids.includes(data.id)) {
                const todoData = {...data,completed: true};
                updateTodos(todoData);
                return todoData;
            } else {
                return data;
            }
        });
        
        setList(newArrUpdate)
    }

    const loading_gif = <img id="loading-image" src="loader.gif" alt="Loading..."/>;
    let data_content = "";
    if(isError){
        data_content = <><br />{error.message}<div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
    }else if(isLoading){
        data_content = <><br /><div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
    }else{
        data_content = <>{list?.length>0 && <ListTodo list={list} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems} pageNumber={pageNumber} setPageNumber={setPageNumber} refetch={refetch}/>}</>
    }
    
    return (
        <>{data_content}</>       
    )
}

export default Todo;