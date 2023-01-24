import { useState, useEffect } from 'react';
import {useTodosList} from './hooks/useTodosList';
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import ListItem from './ListItem';

const ListTodo = ({list, updateCompleted, deleteCompletedItems, pageNumber, setPageNumber}) => {
    const [ids, setIds] = useState([]);
    const [checked, setChecked] = useState("disabled");
    const [search, setSearch] = useState("");
    const [sortItem, setSort] = useState("0");
    const {data, isLoading, isSuccess} = useTodosList({});
    
    const [filteredList, setFilterList] = useState([]);
    useEffect(()=>{
        if(data){
            setFilterList(data.data);
        }
      }, [data, search])
    // console.log(list, 'list')
     const filteredListArr = list.filter((dataRes) => dataRes.name.includes(search) || dataRes.dueDate.includes(search));
    
    const sortedList = filteredListArr.sort((a,b) => sortItem === "0" ? (a.name > b.name ? 1 : -1) : (a.name > b.name ? -1 : 1))
   
   return <>
        <h1>To Do List</h1>
        <div>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <select style={{"marginLeft":"10px"}} onChange={(e) => setSort(e.target.value)}>
                <option value="0">A-Z</option>
                <option value="1">Z-A</option>
            </select>
        </div>
        <br />

        <Table style={{width:"80%"}} striped bordered hover>
            <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {
                    sortedList.length > 0 ?
                    sortedList.map((item)=> <tr key={item.id}>
                            <ListItem item={item} updateCompleted={updateCompleted} deleteCompletedItems={deleteCompletedItems} setIds={setIds} ids={ids} setChecked={setChecked}/>
                        </tr>
                    ) :<tr><td colSpan="4">No Data Found</td></tr>
                    
                }
                
            </tbody>
        </Table>
        <div><button onClick={()=>setPageNumber(pageNumber-1)} disabled={pageNumber===1}>Prev</button>{ pageNumber }<button onClick={()=>setPageNumber(pageNumber+1)} disabled={pageNumber===3}>Next</button></div>
        <br />
        <div><Button variant="info" onClick={()=>updateCompleted(ids)} disabled={checked}>Mark as Complete</Button>{' '}<Button variant="danger" onClick={()=>deleteCompletedItems(ids)} disabled={checked}>Delete</Button></div>
    </>
}

export default ListTodo;