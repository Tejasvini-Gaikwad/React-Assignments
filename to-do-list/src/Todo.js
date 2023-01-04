    import React,{ useState } from "react";
    import Table from 'react-bootstrap/Table';
    import Button from 'react-bootstrap/Button';
    import Badge from 'react-bootstrap/Badge';

    const Todo = () =>{
        const initialValue = [
            {id:1, name:"Task 1", completed:false}, {id:2, name:"Task 2", completed:false}, {id:3, name:"Task 3", completed:false},
        ];
        const [ list, setList ] = useState(initialValue);
        const [nameArr, setNames] = useState([]);
        const [ids, setIds] = useState([]);
        const [name, setName] = useState("");
        const [checked, setChecked] = useState("disabled");

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
              setNames(updatedArr);
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

        function AddTodo(){
            return (
                <div>
                    <h1>To Do List</h1>
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
                    <br /><br />
                    <div>
                        <Button onClick={()=>saveList(name)}>Add</Button>{' '}
                        <Button onClick={()=>setName("")}>Clear</Button>
                    </div>
                </div>
            )
        }

        React.memo(function ListTodo({item}){
            return (
                <>
                    <td><input type="checkbox" id={item.id} name={item.name} value={item.id} onChange={(e)=>handleChange(e)} /></td>
                    <td>{item.name}</td><td>{item.completed? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Incomplete</Badge>}</td>
                    <td>{!item.completed ? <Button variant="info" onClick={()=>{updateCompleted([item.id])}}>Mark as Complete</Button>:""}{" "}<Button variant="danger" onClick={()=>{deleteCompletedItems([item.id])}}>Delete</Button></td>
                </>
            )
        })
        
        return (
            <>
               {AddTodo()}
                <br />
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
                                    <td><input type="checkbox" id={item.id} name={item.name} value={item.id} onChange={(e)=>handleChange(e)} /></td>
                                    <td>{item.name}</td><td>{item.completed? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Incomplete</Badge>}</td>
                                    <td>{!item.completed ? <Button variant="info" onClick={()=>{updateCompleted([item.id])}}>Mark as Complete</Button>:""}{" "}<Button variant="danger" onClick={()=>{deleteCompletedItems([item.id])}}>Delete</Button></td>
                                    {/* <ListTodo item={item}/> */}
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