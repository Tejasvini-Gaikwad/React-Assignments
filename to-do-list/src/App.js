
  import React,{ useState } from "react";
  import { QueryClientProvider, QueryClient } from "react-query";
  import { ReactQueryDevtools } from 'react-query/devtools'
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import './App.css';
  import Todo from './Todo';
  import AddTodo from './AddTodo';
  import ItemDetails from './ItemDetails';
  import Navbar from "./Components/Navbar";
  import TaskForm from "./TaskForm"

  function App() {
    const [ list, setList ] = useState([]);
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <div className="App">
                <header className="App-header">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Todo list={list} setList={setList}/>}></Route>  
                      <Route path="/AddTodo" element={<AddTodo  list={list} setList={setList}/>}></Route>  
                      <Route path="/ItemDetails/:id" element={<ItemDetails />}></Route>  
                      <Route path="/task-form" element={<TaskForm />} ></Route>
                      <Route path="/*" element={<Navigate to="/" />}></Route>
                    </Routes>
                </header>
              </div>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
        </QueryClientProvider>
       
    );
  }

  export default App;
