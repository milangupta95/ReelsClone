import React from 'react'
import { useContext } from 'react'
import Authcontext from '../AuthContextProvider'
import { useState } from 'react';
import { Navigate } from 'react-router';
import { TextField,Button } from '@mui/material';
function ResetPassword() {
    const userData = useContext(Authcontext);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const otpChanger = (e) => {
        setOtp(e.taget.value);
    }
    const handleResetPassword = () => {
        
    }
    return (
        userData.user ? <Navigate to='/feed'></Navigate> :
            <div className='flex justify-center items-center w-full h-screen'>
                <div className='flex justify-between items-center p-5'>
                    <div className=' mr-30 hidden md:flex'>
                        <img className="h-[500px] w-[500px]" src="https://e7.pngegg.com/pngimages/724/338/png-transparent-iphone-with-mobile-ui-kit-instagram-smartphone-mockup-and-chat-app.png" alt="" />
                    </div>
                    <div className=' shadow-lg shadow-grey-800 p-5'>
                        <img className="w-[300px]" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" alt="" />
                        <div className='mb-5'>
                            <TextField value={email} onChange={emailChanger} id="outlined-basic" label="Email" variant="outlined" sx={{ width: 300 }} />
                        </div>
                        <div className='mb-5'>
                            <TextField value={otp} onChange={otpChanger} id="outlined-basic" label="Password" variant="outlined" sx={{ width: 300 }} />
                        </div>
                        <div className=''>
                            <Button onClick={handleResetPassword} variant="contained" sx={{ width: 300 }}>Reset Password</Button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ResetPassword