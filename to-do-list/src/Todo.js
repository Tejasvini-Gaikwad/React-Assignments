    import React,{ useEffect, useState } from "react";
    import useFetch from "react-fetch-hook";
    import ListTodo from "./ListTodo";

    const Todo = ({list,setList}) =>{
        const {isLoading, data, error} = useFetch("http://localhost:8000/Todos");
        
        useEffect(()=>{
          if(data){
            setList(data);
          }
        }, [data])
       
        const deleteCompletedItems = (ids) => {
            const newArr = list.filter((data)=>{
                if(ids.includes(data.id)){
                    fetch("http://localhost:8000/Todos/"+data.id,{
                    method : 'DELETE'
                }).then((res) => {
                    
                })
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
                return {
                ...data,
                completed: true,
                };
            } else {
                return data;
            }
            });
            setList(newArrUpdate)
        }

        const loading_gif = <img id="loading-image" src="loader.gif" alt="Loading..."/>;
        let data_content = "";
        if(error){
            data_content = <><br />{error.message}<div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
        }else if(isLoading){
            data_content = <><br /><div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
        }else{
            data_content = <>{list && <ListTodo list={list} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems}/>}</>
        }
        
        return (
            <>{data_content}</>       
        )
    }

    export default Todo;