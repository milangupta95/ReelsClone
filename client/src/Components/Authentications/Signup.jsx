import { TextField,Button } from '@mui/material'
import React from 'react'
import {Link} from '@mui/material'
import { useState } from 'react';
import api from '../../utility';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Authcontext from '../AuthContextProvider';
function Signup() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [conf,setConf] = useState("");
    const [profilePic,setProfilePic] = useState("");

    const history = useNavigate();
    const userData = useContext(Authcontext);
    const nameChanger = (e) => {
        setName(e.target.value);
    }
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const passChanger = (e) => {
        setPass(e.target.value);
    }
    const confChanger = (e) => {
        setConf(e.target.value);
    }
    const profilePicChanger = (e) => {
        setProfilePic(e.target.value);
    }
    const handleSignUpSubmit = async() => {
        try {
            if(pass !== conf) {
                window.alert("Password and Confirm Password Does Not Match");
            } else {
                const res = await api.post('/auth/signup',{
                    fullName: name,
                    email: email,
                    password: pass,
                    profilepic: ""
                });
                window.alert("Signup SuccessFully");
                history("/login");
            }
            
        } catch(err) {
            window.alert(err.message);
        }
    }
    return (
        userData.user ? <Navigate to = '/feed'></Navigate> :
        <div className='flex justify-center items-center w-full h-screen'>
            <div className='shadow-lg shadow-grey-800 p-5'>
                <img className="w-[300px]" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" alt = ""/>
                <div className='mb-2'>
                    <TextField value = {name} onChange={nameChanger} variant='outlined' label='Name' sx={{width:300}}></TextField>
                </div>
                <div className='mb-2'>
                    <TextField value = {email} onChange = {emailChanger} variant='outlined' label='Email' type='email' sx={{width:300}}></TextField>
                </div>
                <div className='mb-2'>
                    <TextField value = {pass} onChange = {passChanger} variant='outlined' label='Password' type='password' sx={{width:300}}></TextField>
                </div>
                <div className='mb-2'>
                    <TextField value = {conf} onChange = {confChanger} variant='outlined' label='Confirm Password' type='password' sx={{width:300}}></TextField>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <Link href='/forgotpassword' sx = {{textDecoration:"none"}}>Forgot Password</Link>
                    <Link href='/login' sx = {{textDecoration:"none"}}>Login</Link>
                </div>
                <div className='mb-2'>
                    <Button onClick = {handleSignUpSubmit} variant="contained" sx = {{width:300}}>Signup</Button>
                </div>
            </div>
        </div>
    )
}

export default Signup