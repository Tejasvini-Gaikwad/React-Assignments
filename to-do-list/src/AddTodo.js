
    import { useState, useReducer } from 'react';
    import { useAddTodo, useTodosList } from './hooks/useTodosList';
    import { useNavigate } from "react-router-dom";
    import Button from 'react-bootstrap/Button';
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";

    const ACTION_CONSTANTS = {
      SET_DATE : 'SET_DATE',
      SETNAME : 'SETNAME'
    }
    const reducer = (state, action) => {
        switch(action.type){
          case ACTION_CONSTANTS.SET_DATE : 
                {state.dueDate = action.payload}
                return {...state}
          case ACTION_CONSTANTS.SETNAME : 
               state.name = action.payload
               return {...state}
          default :
               return state
               
        }
    }

    const initialState = {
      dueDate : new Date(),
      name : ''
    }
    const AddTodo = ({list,setList}) => {
    const [state, dispatch] = useReducer(reducer,initialState)
    const name = state.name
    const dueDate = state.dueDate
    const nevigate = useNavigate();
      
    const { mutate : addTodo, isLoading, data, isSuccess} = useAddTodo();
    if(isSuccess){
      nevigate('/ItemDetails/'+data.data.id, { state: {item:data.data} })
    }
    // 
    let updatedArr = useTodosList({});
    const handleSubmit = (evt) =>{
     evt.preventDefault();
     if(name === ''){
        alert('Please enter Name');
        return false;
     }
     let updatedArr = [];
     list.map(data => {
        updatedArr = [...updatedArr,data.name];
     })

     if(updatedArr.includes(name)){
        alert("Item already exists");
        return false;
     }
    
     const to_do = {name, completed:false, dueDate:dueDate.toLocaleDateString("es-CL")};
     addTodo(to_do);    
    }
      return (
        <div>
            <h1>Add To Do</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => {dispatch({type:'SETNAME',payload:e.target.value})}} />
            <br /><br />
            <DatePicker selected={dueDate} dateFormat='dd-MM-yyyy'  onChange={(date) => dispatch({type:'SET_DATE', payload:date})} minDate={new Date()} />
            <br /><br />
            <div>
                {!isLoading ? <Button type="submit">Add</Button> : <Button type="submit">Add...</Button>}{' '}               
                <Button onClick={()=>dispatch('SETNAME',"")}>Clear</Button>
            </div>
            </form>
        </div>
      );
  }

  export default AddTodo;
