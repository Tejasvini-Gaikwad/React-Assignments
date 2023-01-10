
    import Button from 'react-bootstrap/Button';
    
    const AddTodo = ({name,setName,saveList}) => {
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
    );
  }

  export default AddTodo;
