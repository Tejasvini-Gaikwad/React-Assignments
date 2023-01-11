    import React,{ useEffect, useState } from "react";
    import useFetch from "react-fetch-hook";
    import Table from 'react-bootstrap/Table';
    import Button from 'react-bootstrap/Button';
    import Badge from 'react-bootstrap/Badge';
    import AddTodo from "./AddTodo";
    import ListTodo from "./ListTodo";

    const Todo = () =>{
        const {isLoading, data, error} = useFetch("http://localhost:8000/Todos");
        const [ list, setList ] = useState([]);
        const [name, setName] = useState("");

        useEffect(()=>{
            setList(data);
        }, [data])

        //function to delete items
        const deleteCompletedItems = (ids) => {
            const newArr = list.filter((data)=>{
              if(!ids.includes(data.id)){
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

        const saveList = (name) => {
            let updatedArr = [];

            if(name === ''){
              alert('Please enter value');
              return false;
            }
            list.map(data => {
              updatedArr = [...updatedArr,data.name];
            });
            if(!updatedArr.includes(name)){
              let id = list.length;
              let updatedList = [...list];
              updatedList = [...list, {id:id+1,name:name,completed:false}];
              setList(updatedList)
              setName("");
            }else{
              alert("Item already exists");
            } 
          }

        if(error){
            return <div><AddTodo name={name} setName={setName} saveList={saveList}/><br />{error.message}<div id="loading" style={{"align":"center"}}>
                <img id="loading-image" src="loader.gif" alt="Loading..."/>
            </div></div>
        }
        if(isLoading){
            return <>
                <AddTodo name={name} setName={setName} saveList={saveList}/><br /><div id="loading" style={{"align":"center"}}>
                        <img id="loading-image" src="loader.gif" alt="Loading..."/>
                </div>
            </>
        }
        return (
            <>
                <AddTodo name={name} setName={setName} saveList={saveList}/>
                <br />
                {list && <ListTodo list={list} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems}/>}
            </>
        )
    }

    export default Todo;