import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router';
import Login from './Components/Authentications/Login';
import Signup from './Components/Authentications/Signup';
import Feed from './Components/Feed/Feed';
import Profile from './Components/User/Profile';
import Authcontext from './Components/AuthContextProvider';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import ForgotPassword from './Components/Authentications/ForgotPassword';
import ResetPassword from './Components/Authentications/ResetPassword';
import AddFriend from './Components/Friend/AddFriend';
function App() {
  const intialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";
  const [user, setUser] = useState(intialUser);
  return (
    <CookiesProvider>
      <Authcontext.Provider value={{ user, setUser }}>
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/addfriend' element={<AddFriend/>}></Route>
        </Routes>
      </React.Fragment>
    </Authcontext.Provider></CookiesProvider>

  );
}

export default App;
