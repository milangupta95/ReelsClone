import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../utility';
import { Avatar, CircularProgress, IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

function Friends() {
    const [loading, setLoading] = useState(true);
    const [friends, setFriend] = useState([]);
    useEffect(() => {
        setLoading(true);
        async function fetchFriends() {
            const res = await api.get("friend/allFriends");
            if (res.status === 200) {
                if (res.data.friends) {
                    console.log(res.data.friends);
                    setFriend(res.data.friends);
                }
                console.log(res);
                setLoading(false);
            } else if (res.status === 500) {
                window.alert("Internal Error");
                console.log(res);
                setLoading(false);
            }
        }
        fetchFriends();
    }, []);
    return (
        <div>
            {loading ?
                <CircularProgress /> : friends.length > 0 ?
                    <div className='shadow-lg shadow-grey-800 p-5'>
                        <h1 className='text-xl font-bold'>Friends</h1>
                        {friends.map(friend => {
                            return (
                                <div className='flex justify-between items-center border-b-2 border-gray-600 p-2'>
                                    <div className='flex'>
                                        <Avatar src={friend.profilepic} alt={friend.fullName} className='mr-2'></Avatar>
                                        <div className='text-xl tracking-widep p-2'>{friend.fullName}</div>
                                    </div>
                                    <div>
                                        <IconButton>
                                            <TelegramIcon></TelegramIcon>
                                        </IconButton>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                    <div>No Friends to Show </div>
            }
        </div>
    )
}

export default Friends