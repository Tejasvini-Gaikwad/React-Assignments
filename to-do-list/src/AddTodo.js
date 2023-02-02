
    import { useState } from 'react';
    import { useAddTodo, useTodosList } from './hooks/useTodosList';
    import { useNavigate } from "react-router-dom";
    import Button from 'react-bootstrap/Button';
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";

    const AddTodo = ({list,setList}) => {
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
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
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
            <br /><br />
            <DatePicker selected={dueDate} dateFormat='dd-MM-yyyy'  onChange={(date) => setDueDate(date)} minDate={new Date()} />
            <br /><br />
            <div>
                {!isLoading ? <Button type="submit">Add</Button> : <Button type="submit">Add...</Button>}{' '}
               
                <Button onClick={()=>setName("")}>Clear</Button>
            </div>
            </form>
        </div>
      );
  }

  export default AddTodo;
