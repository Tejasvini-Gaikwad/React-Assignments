import useFetch from "react-fetch-hook";
import { useParams, useLocation  } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useEffect } from "react";
import { useTodoList } from "./hooks/useTodoList";

// const options = {  year: 'numeric', month: 'short', day: 'numeric' };
const ItemDetails = () => {
    const params = useParams();
    let {id} = params;
    id = parseInt(id);
    const location = useLocation();
    // const item = location.state.item;
    const {isLoading, data, isError, error} = useTodoList(id);
    const loading_gif = <img id="loading-image" src="loader.gif" alt="Loading..."/>;
    let data_content = "";
    if(isError){
        data_content = <><br />{error.message}<div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
    }
    
    if(isLoading){
        data_content = <><br /><div id="loading" style={{"align":"center"}}>{loading_gif}</div></>
    }
    if(data){
        data_content = <> <h2>{data.data.name}</h2>
        <h3>{data.data.completed? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Incomplete</Badge>}</h3>
        <h3>{data.data.dueDate}</h3></>
    }
     
    return (
        <>{data_content}</>       
    )
}

export default ItemDetails;