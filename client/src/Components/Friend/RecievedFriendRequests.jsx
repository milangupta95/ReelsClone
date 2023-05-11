import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../utility';
import { Avatar,Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function RecievedFriendRequests(props) {
    const [isRequestAccepted,setFriendRequestAccepted] = useState(false);
    const [isFriendRequestRejected,setFriendRequestRejected] = useState(false);
    const acceptFriendRequest = async () => {
        try {
            const res = await api.patch(`friend/accept/${props.request.id}`);
            setFriendRequestAccepted(true);
            if(res.status === 200) {
                window.alert("Friend Request Accepted");
            } else if(res.status === 500){
                window.alert("Unable to Accept Friend request");
                setFriendRequestAccepted(false);
            }
        } catch(err) {
            window.alert(err.message);
            setFriendRequestAccepted(false);
        }
    }
    const rejectFriendRequest = async () => {
        try {
            const res = await api.delete(`friend/reject/${props.request.id}`);
            setFriendRequestRejected(true);
            if(res.status === 200) {
                window.alert("Friend Request Rejected");
            } else if(res.status === 500) {
                window.alert("Unable to Reject Friend Request");
                setFriendRequestRejected(false);
            }
        } catch(err) {
            window.alert(err.message);
            setFriendRequestRejected(false);
        }
    }
    return (
        <div className='flex items-center justify-between p-2 border-b-2 border-grey-800'>
            <div className='flex items-center'>
                <Avatar className='mr-2'></Avatar>
                <h1 className='mr-4'>{props.request.fullName}</h1>
            </div>
            {isRequestAccepted ? <div>
                <Button disabled = {true} color = "success">Accepted</Button>
                </div>
                : isFriendRequestRejected ? <Button color='error' disabled="true">Friend Request Rejected</Button> : <div>
                <Button onClick={acceptFriendRequest} variant="contained" className='mr-2'>Accept</Button>
                <Button onClick={rejectFriendRequest} variant="contained" color='error'>Reject</Button>
            </div>}
        </div>
    )
}

export default RecievedFriendRequests