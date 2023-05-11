import React from 'react'
import { useContext } from 'react'
import Authcontext from './AuthContextProvider';
import { Avatar, IconButton } from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useContext(Authcontext);
    const history = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['login']);
    const handleAvatarClick = () => {
        setShowMenu(!showMenu);
    }
    const handleLogOut = () => {
        userData.setUser("");
        localStorage.clear();
        setShowMenu(!showMenu);
        removeCookie('login');
        history('/');
    }
    const handleProfileClick = () => {
        setShowMenu(!showMenu);
        history('/profile');
    }
    return (
        <div>
            <div className='flex shadow-lg shadow-grey-800 text-black h-16 justify-center sm:justify-between items-center w-full'>
                <Link to='/'><img href="/" src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" className='h-20 w-40 mix-blend-multiply cursor-pointer' /></Link>
                <div>
                    {userData.user ?
                        <ul className='flex'>
                            <li>
                                <IconButton href='/feed'>
                                    <img className='shadow-sm shadow-grey-800 rounded-lg w-10 h-10 cursor-poniter' src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-reel-4560268-3789542.png" />
                                </IconButton>
                            </li>
                            <li>
                                <IconButton href='/addfriend'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Noun_project_-_Add_person.svg/1024px-Noun_project_-_Add_person.svg.png" className='w-10 h-10 cursor-pointer' />
                                </IconButton>
                            </li>
                            <li>
                                <Avatar onClick={handleAvatarClick} className='cursor-pointer mt-2' alt={userData.user.data.user.fullName} src={userData.user.data.user.profilepic} />
                            </li>
                        </ul>
                        : <div></div>
                    }
                </div>
            </div>
            <div className={showMenu ? 'absolute top-15 right-5 height-[100px] width-[50px] shadow-lg shadow-grey-800' : 'hidden'}>
                <div onClick={handleProfileClick} className='px-5 py-2 text-xl border-b-2 cursor-pointer'>
                    Profile
                </div>
                <div onClick={handleLogOut} className='px-5 py-2 text-xl cursor-pointer'>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar