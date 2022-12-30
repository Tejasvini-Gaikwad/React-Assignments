    import { useState } from "react";
    import Table from 'react-bootstrap/Table';
    import Button from 'react-bootstrap/Button';

    const Todo = ({list,deleteCompletedItems,updateCompleted}) =>{
        const [ids, setIds] = useState([]);
        const [checked, setChecked] = useState("disabled");
        //make arrays of ids based on checkbox click
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
        
        return (
            <>
                <h1>To Do List</h1>
                <Table style={{width:"80%"}} striped bordered hover>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            list.length > 0 ?
                            list.map((item)=>{
                                return <tr key={item.id}>
                                        <td><input type="checkbox" id={item.id} name={item.name} value={item.id} onChange={handleChange} /></td>
                                        <td>{item.name}</td><td>{item.completed? "Completed" : "Incomplete"}</td>
                                        <td>{!item.completed ? <Button variant="info" onClick={()=>{updateCompleted([item.id])}}>Mark as Complete</Button>:""}{" "}<Button variant="danger" onClick={()=>{deleteCompletedItems([item.id])}}>Delete</Button></td>
                                    </tr>
                            }) :<tr><td colspan="4">No Data Found</td></tr>
                            
                        }
                        
                    </tbody>
                </Table>
                <br />
                <div><Button variant="info" onClick={()=>updateCompleted(ids)} disabled={checked}>Mark as Complete</Button>{' '}<Button variant="danger" onClick={()=>deleteCompletedItems(ids)} disabled={checked}>Delete</Button></div>
                    
            </>
        )
    }

    export default Todo;