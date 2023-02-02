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
        
        const loading_gif = <img id="loading-image" src="loader.gif" alt="Loading..."/>;
        const common_block = <AddTodo name={name} setName={setName} saveList={saveList}/>;

        if(error){
            return <div>{common_block}<br />{error.message}<div id="loading" style={{"align":"center"}}>
                {loading_gif}
            </div></div>
        }
        if(isLoading){
            return <>
                {common_block}<br /><div id="loading" style={{"align":"center"}}>{loading_gif}</div>
            </>
        }
        return (
            <>
                {common_block}
                <br />
                {list && <ListTodo list={list} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems}/>}
            </>
        )
    }

    export default Todo;