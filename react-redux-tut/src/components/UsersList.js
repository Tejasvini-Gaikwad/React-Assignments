import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsersList } from "../actions/action"
import Table from 'react-bootstrap/Table';
import '../App.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersList = () => {
    const dispatch = useDispatch()
    const result = useSelector((state) => state)
    useEffect(() => {
        if(!result.userData.data){
            dispatch(getUsersList())
        }
    })
    return (
        <>
            <h1>User List</h1> {'    '}<Link to="/add"><Button variant="primary">Add</Button></Link><br /><br />
           {result.userData.data && <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      result.userData.data.map((item) => <tr key={item.id}>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td><Button variant="danger" onClick={()=>{dispatch(deleteUser(item.id));dispatch(getUsersList())}}>Delete</Button>{' '}<Link to={"/update/"+item.id} ><span>Update</span></Link></td>
                      </tr>)  
                    }
                </tbody>
            </Table>}
        </>
    )
}

export default UsersList