import useFetch from "react-fetch-hook";
import { useParams, useLocation  } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useEffect } from "react";

// const options = {  year: 'numeric', month: 'short', day: 'numeric' };
const ItemDetails = () => {
    const params = useParams();
    let {id} = params;
    id = parseInt(id);
    const location = useLocation();
    const item = location.state.item;
    console.log(item.dueDate.toLocaleString());
    return (
        <div>
           <h2>{item.name}</h2>
           <h3>{item.completed? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Incomplete</Badge>}</h3>
           <h3>{item.dueDate}</h3>
        </div>
    )
}

export default ItemDetails;