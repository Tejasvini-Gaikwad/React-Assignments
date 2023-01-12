    import React,{ useEffect, useState } from "react";
    import useFetch from "react-fetch-hook";
    import Table from 'react-bootstrap/Table';
    import Button from 'react-bootstrap/Button';
    import Badge from 'react-bootstrap/Badge';
    import AddTodo from "./AddTodo";
    import ListTodo from "./ListTodo";

    const Todo = ({list,setList}) =>{
        const {isLoading, data, error} = useFetch("http://localhost:8000/Todos");
        
        useEffect(()=>{
          if(list === undefined || list.length ===0){
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

            // if(ids.includes(data.id)){
            //     fetch("http://localhost:8000/Todos/"+data.id,{
            //         method : 'DELETE'
            //     }).then((res) => {
            //         setList(res);
            //     })
            //   }


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


        if(error){
            return <div><br />{error.message}<div id="loading" style={{"align":"center"}}>
                <img id="loading-image" src="loader.gif" alt="Loading..."/>
            </div></div>
        }
        if(isLoading){
            return <>
                <br /><div id="loading" style={{"align":"center"}}>
                        <img id="loading-image" src="loader.gif" alt="Loading..."/>
                </div>
            </>
        }
        return (
            <>
                {list && <ListTodo list={list} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems}/>}
            </>
        )
    }

    export default Todo;