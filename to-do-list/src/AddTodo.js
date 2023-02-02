
    import { useState } from 'react';
    import Button from 'react-bootstrap/Button';
    import { Link } from "react-router-dom";
    import { useNavigate } from "react-router-dom";

    const AddTodo = ({list,setList}) => {
    const [name, setName] = useState("");
    const nevigate = useNavigate();
    const saveList = (name) => {
        let updatedArr = [];

        if(name === ''){
          alert('Please enter value');
          return false;
        }
        list.map(data => {
          updatedArr = [...updatedArr,data.name];
        });
        console.log(name)
        console.log(updatedArr)
        if(!updatedArr.includes(name)){
          let id = list.length;
          let updatedList = [...list];
          updatedList = [...list, {id:id+1,name:name,completed:false}];
          setList(updatedList)
          setName("");
          nevigate('/',{list})
         
        }else{
          alert("Item already exists");
        } 
      }
      
      return (
        <div>
            <h1>Add To Do</h1>
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
            <br /><br />
            <div>
                <Button onClick={()=>saveList(name)}>Add</Button>{' '}
               
                <Button onClick={()=>setName("")}>Clear</Button>
            </div>
        </div>
      );
  }

  export default AddTodo;
