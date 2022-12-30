  import { useState } from 'react';
  import './App.css';
  import Todo from './Todo';
  function App() {
    const initialValue = [
      {id:1, name:"Task 1", completed:false}, {id:2, name:"Task 2", completed:false}, {id:3, name:"Task 3", completed:false},
    ];

    const [ list, setList ] = useState(initialValue);
    
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
      
      
      // const newArrUpdate = list.map(data => {
      //   if (data.id === id) {
      //     return {
      //       ...data,
      //       completed: true,
      //     };
      //   } else {
      //     return data;
      //   }
      // });
      setList(newArrUpdate)
    }
    return (
      <div className="App">
        <header className="App-header">
            <Todo list={list} deleteCompletedItems={deleteCompletedItems} updateCompleted={updateCompleted}/>
        </header>
      </div>
    );
  }

  export default App;
