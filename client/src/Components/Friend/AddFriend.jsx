import React from 'react'
import { useEffect } from 'react'
import api from '../../utility';
import { useState } from 'react';
import FriendSuggestionUser from './FriendSuggestionUser';
import RecievedFriendRequests from './RecievedFriendRequests';
import { CircularProgress } from '@mui/material';
function AddFriend() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        setLoading(true);
        async function getAllUsers() {
            const res = await api.get('friends/suggestions');
            if (res.status === 200) {
                if (res.data.users.length > 0) {
                    setUsers(res.data.users);
                } else {
                    setUsers([]);
                }
                setLoading(false);
            } else if (res.status === 500) {
                setUsers([]);
                setError("There is Some Internal Error");
                setLoading(false);
            }
        }
        getAllUsers();
    }, []);
    useEffect(() => {
        async function getRequests() {
            setLoading(true);
            const res = await api.get('friends/recieved');
            if (res.status === 200) {
                console.log(res.data.users);
                setRequests(res.data.users);
                setLoading(false);
            } else if (res.status === 400) {
                setLoading(false);
            }
        }
        getRequests();
    }, []);
    return (
        <div className='flex sm:flex-row flex-col justify-center w-full'>
            <div className='p-5 shadow-lg shadow-grey-800 mr-5'>
                <h1 className='text-xl font-bold'>
                    Suggested
                </h1>
                <div className=''>
                    {
                        loading ? <CircularProgress/> :
                            error ? <div>{error}</div> :
                                users.length === 0 ? <div>No Users to show </div> :
                                    <div>
                                        {users.map(user => {
                                            return (
                                                <FriendSuggestionUser user={user}></FriendSuggestionUser>
                                            )
                                        })}
                                    </div>
                    }
                </div>
            </div>

            <div className='shadow-lg shadow-grey-800 p-5 mr-5'>
                <h1 className='text-xl font-bold'>Requests</h1>
                {
                    loading ? <CircularProgress/> :
                        requests.length === 0 ? <div className='text-xl tracking-wider'>No Requests yet to show </div> :
                            <div>
                                {
                                    requests.map(request => {
                                        return (<RecievedFriendRequests request={request} />)
                                    })
                                }
                            </div>
                }
            </div>
        </div>
    )
}

export default AddFriend