import React from 'react'
import { Avatar, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../../utility';
import { useState } from 'react';
function FriendSuggestionUser(props) {
    const [isFreindRequestSend, setSend] = useState(false);
    const addFriend = async () => {
        try {
            setSend(true);
            const res = await api.post("friend/sendFriendReq", {
                id: props.user.id
            });
            if (res.status === 200) {
                window.alert("Friend Request Sent SuccessFully");
            } else if (res.status === 500) {
                setSend(false);
                window.alert("Unable to send friend request");
            }
        } catch (err) {
            setSend(false);
            window.alert(err.message);
        }
    }
    return (
        <div className='flex items-center justify-between p-2 border-b-2 border-grey-800'>
            <div className='flex items-center'>
                <Avatar className='mr-2'></Avatar>
                <h1 className='mr-4'>{props.user.fullName}</h1>
            </div>
            <div>
                {isFreindRequestSend ? <Button disbaled = "true" color = "success">Request Send</Button> : 
                <Button onClick={addFriend} variant="contained">Add Friend <PersonAddIcon className='ml-2' /></Button>}
            </div>
        </div>
    )
}

export default FriendSuggestionUser