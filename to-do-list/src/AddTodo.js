
    import { useState } from 'react';
    import { useNavigate } from "react-router-dom";
    import Button from 'react-bootstrap/Button';
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";

    const AddTodo = ({list,setList}) => {
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [isPending, setIsPending] = useState(false)
    const nevigate = useNavigate();
      
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
     setIsPending(true);
     const to_do = {name, completed:false, dueDate:dueDate.toLocaleDateString("es-CL")};
     fetch("http://localhost:8000/Todos",{
      method : "POST",
      headers : {"Content-Type":"application/json"},
      body : JSON.stringify(to_do)
     }).then((res)=>{
      return res.json();
     }).then((response)=>{
      setIsPending(false)
      nevigate('/ItemDetails/'+response.id, { state: {item:response} })
     })
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
                {!isPending && <Button type="submit">Add</Button>}{' '}
                {isPending && <Button type="submit">Add...</Button>}{' '}
               
                <Button onClick={()=>setName("")}>Clear</Button>
            </div>
            </form>
        </div>
      );
  }

  export default AddTodo;
