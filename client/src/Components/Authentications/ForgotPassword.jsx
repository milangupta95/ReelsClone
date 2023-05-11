import React from 'react'
import { useContext } from 'react'
import Authcontext from '../AuthContextProvider'
import api from '../../utility'
import { useState } from 'react'
import { Navigate } from 'react-router'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router'
function ForgotPassword() {
    const userData = useContext(Authcontext);
    const [email, setEmail] = useState("");
    const [otp, setotp] = useState("");
    const [otpSent, setotpSent] = useState(false);
    const [password,setPassword] = useState("");
    const [confpassword,setconfpassword] = useState("");
    const history = useNavigate();

    const passwordChanger = (e) => {
        setPassword(e.target.value);
    }
    const confpasswordChanger = (e) => {
        setconfpassword(e.target.value);
    }
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const otpChanger = (e) => {
        setotp(e.target.value);
    }
    const handleSendOtp = async () => {
        try {
            const res = await api.post("auth/forgotpassword", {
                email: email
            });
            if (res.status === 200) {
                window.alert("Otp has been sent to your email");
                setotpSent(true);
            } else if (res.status === 400) {
                window.alert("Unable to send otp");
            } else if(res.status === 500) {
                window.alert("Internal Error");
            }
        } catch (err) {
            window.alert(err.message);
        }
    }

    const handleResetPassword = async () => {
        try {
            if(confpassword !== password) {
                window.alert("Password and Confirm Password Does Not Matches");
            } else {
                const res = await api.post("/auth/resetpassword",{
                    email: email,
                    otp: otp,
                    password: password
                });
                if(res.status === 200) {
                    window.alert("Password Reset SuccessFull");
                    history("/login");
                } else if(res.status === 400) {
                    window.alert("Otp is wrong")
                } else if(res.status === 500){
                    window.alert("There is Some Internal Error");
                }
            }
        } catch(err) {
            window.alert("Otp is wrong");
        }
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
                            <TextField disabled = {otpSent} value={email} onChange={emailChanger} id="outlined-basic" label="Email" variant="outlined" sx={{ width: 300 }} />
                        </div>

                        <div className='mb-5'>
                            <Button disabled = {otpSent} onClick={handleSendOtp} variant="contained" sx={{ width: 300 }}>Send OTP</Button>
                        </div>
                        <div className='mb-5'>
                            <TextField disabled={otpSent ? false : true} value={otp} onChange={otpChanger} id="outlined-basic" label="OTP" variant="outlined" sx={{ width: 300 }} />
                        </div>
                        <div className='mb-5'>
                            <TextField disabled={otpSent ? false : true} value={password} onChange={passwordChanger} id="outlined-basic" type ="password" label = "Password" variant="outlined" sx={{ width: 300 }} />
                        </div>
                        <div className='mb-5'>
                            <TextField disabled={otpSent ? false : true} value={confpassword} onChange={confpasswordChanger} id="outlined-basic" type ="password" label = "Confirm Password" variant="outlined" sx={{ width: 300 }} />
                        </div>
                        <div className='mb-5'>
                            <Button disabled = {otpSent ? false : true} onClick={handleResetPassword} variant="contained" sx={{ width: 300 }}>Reset Password</Button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ForgotPassword