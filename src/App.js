import React, { useContext } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Main from './pages/Main';
import './styles/App.css';



function App() {
  const { currentUser } = useContext(AuthContext)


  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<RequireAuth><Admin/></RequireAuth>}></Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/main' element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
