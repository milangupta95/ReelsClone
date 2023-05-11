import React from 'react'
import { TextField, Button } from '@mui/material'
import { Link } from '@mui/material'
import { useState } from 'react'
import api from '../../utility';
import { Navigate, useNavigate } from 'react-router';
import { useContext } from 'react';
import Authcontext from '../AuthContextProvider';
function Login() {
    const userData = useContext(Authcontext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }

    const passwordChanger = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginClick = async () => {
        try {
            console.log('Login Called');
            const res = await api.post('/auth/login',{
                email: email,
                password: password
            });
            console.log(res);
            if(res.status === 201) {
                window.alert("Logged In SuccesFully");
                localStorage.clear();
                localStorage.setItem('user',JSON.stringify(res));
                userData.setUser(res);
                history('/feed');
            } else {
                window.alert(res.message);
            }
        } catch(err) {
            window.alert(err.message);
        }
    }
    return (
        userData.user ? <Navigate to = '/feed'></Navigate>:
        <div className='flex justify-center items-center w-full h-screen p-2'>
            <div className='flex justify-between items-center p-5'>
                <div className='mr-30 hidden md:flex'>
                    <img className = "h-[500px] w-[500px]" src = "https://e7.pngegg.com/pngimages/724/338/png-transparent-iphone-with-mobile-ui-kit-instagram-smartphone-mockup-and-chat-app.png" alt = ""/>
                </div>
                <div className='shadow-lg shadow-grey-800 p-5'>
                    <img className="w-[300px]" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" alt = ""/>
                    <div className='mb-5'>
                        <TextField value={email} onChange={emailChanger} id="outlined-basic" label="Email" variant="outlined" sx={{ width: 300 }} />
                    </div>
                    <div className='mb-5'>
                        <TextField type="password" value={password} onChange={passwordChanger} id="outlined-basic" label="Password" variant="outlined" sx={{ width: 300 }} />
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                        <Link href='/forgotpassword' sx={{ textDecoration: 'none', cursor: 'pointer' }}>Forgot Password</Link>
                        <Link href='/signup' sx={{ textDecoration: 'none', cursor: 'pointer' }}>SignUp</Link>
                    </div>
                    <div className=''>
                        <Button onClick={handleLoginClick} variant="contained" sx={{ width: 300 }}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login