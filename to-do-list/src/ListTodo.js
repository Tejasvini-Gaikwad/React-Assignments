import { useState } from 'react';
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import ListItem from './ListItem';

const ListTodo = ({list, updateCompleted, deleteCompletedItems}) => {
    const [ids, setIds] = useState([]);
    const [checked, setChecked] = useState("disabled");

    return <>
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
                            <ListItem item={item} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems} setIds={setIds} ids={ids} setChecked={setChecked}/>
                        </tr>
                    }) :<tr><td colSpan="4">No Data Found</td></tr>
                    
                }
                
            </tbody>
        </Table>
        <br />
        <div><Button variant="info" onClick={()=>updateCompleted(ids)} disabled={checked}>Mark as Complete</Button>{' '}<Button variant="danger" onClick={()=>deleteCompletedItems(ids)} disabled={checked}>Delete</Button></div>
    </>
}

export default ListTodo;