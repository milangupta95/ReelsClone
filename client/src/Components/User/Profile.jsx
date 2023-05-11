import React from 'react'
import { useContext } from 'react'
import Authcontext from '../AuthContextProvider'
import { Navigate } from 'react-router'
import Friends from '../Friend/Friends';

function Profile() {
  const userData = useContext(Authcontext);
  const imageSrc = userData.user.data.user.profilepic ? userData.user.data.user.profilepic : "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg";
  return (
    userData.user ?
      <div className='flex flex-col md:flex-row justify-between md:px-[20%] px-[0] w-full h-full'>
        <div className='shadow-lg shadow-grey-800 p-2'>
          <h1 className='text-xl font-bold'>Profile</h1>
          <div className='w-full flex justify-center items-center'>
            <img className="rounded-full w-[200px] h-[200px] md:w-[340px] md:h-[340px]" src={imageSrc} alt='No Pic' />
          </div>
          <div className='md:text-2xl text-xl'>Name <span className='text-sky-800'>{userData.user.data.user.fullName}</span></div>
          <div className='md:text-2xl text-xl'>Email <span className='text-sky-800'>{userData.user.data.user.email}</span></div>
        </div>
        <div>
          <Friends></Friends>
        </div>
      </div> : <Navigate to='/login'></Navigate>
  )
}

export default Profile