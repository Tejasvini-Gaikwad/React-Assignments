import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from './components/UsersList';
import UpdateUsers from './components/UpdateUsers';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/add' element={<Users />} />
            <Route path='/' element={<UsersList />} />
            <Route path="/update/:id" element={<UpdateUsers />} />
          </Routes>
          {/* <Users /> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
