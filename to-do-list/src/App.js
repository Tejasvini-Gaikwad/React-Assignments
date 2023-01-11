
  import React,{ useState } from "react";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import './App.css';
  import Todo from './Todo';
  import AddTodo from './AddTodo';
  import ItemDetails from './ItemDetails';
  import Navbar from "./Components/Navbar";

  function App() {
    const [ list, setList ] = useState([]);
    
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
              <Navbar />
              <Routes>
                <Route path="/" element={<Todo list={list} setList={setList}/>}></Route>  
                <Route path="/AddTodo" element={<AddTodo  list={list} setList={setList}/>}></Route>  
                <Route path="/ItemDetails/:id" element={<ItemDetails />}></Route>  
                <Route path="/*" element={<Navigate to="/" />}></Route>
              </Routes>
          </header>
        </div>
      </BrowserRouter>
    );
  }

  export default App;
