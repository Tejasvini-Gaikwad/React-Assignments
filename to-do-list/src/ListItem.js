import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ListItem = ({item, updateCompleted, deleteCompletedItems,setIds, ids, setChecked}) => {
   
    
    const handleChange = (e) => {
        let updatedList = [...ids];
        if(e.target.checked){
            updatedList = [...ids,parseInt(e.target.value)];
        }else{
            updatedList.splice(ids.indexOf(e.target.value), 1);
        }
        setIds(updatedList);
        if(updatedList.length > 0){
            setChecked("");
        }else{
            setChecked("disabled");
        }
    }
    return <>
        <td><input type="checkbox" id={item.id} name={item.name} value={item.id} onChange={handleChange} /></td>
        <td><Link to={`/ItemDetails/${item.id}`} state={{item}}>{item.name}</Link></td><td>{item.dueDate}</td><td>{item.completed? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Incomplete</Badge>}</td>
        <td>{!item.completed ? <Button variant="info" onClick={()=>{updateCompleted([item.id])}}>Mark as Complete</Button>:""}{" "}<Button variant="danger" onClick={()=>{deleteCompletedItems([item.id])}}>Delete</Button></td>
    </>
}

export default ListItem;