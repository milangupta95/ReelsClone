import React from 'react'
import Videos from './Videos';
import './Feed.css'
import { useContext } from 'react';
import Authcontext from '../AuthContextProvider';
import { Navigate } from 'react-router';
import { Input } from '@mui/material';
import { Button } from '@mui/material'
import axios from 'axios';
import api from '../../utility'
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
function Feed() {
    const userData = useContext(Authcontext);
    const [posts, setPosts] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [uploading,setUploading] = useState(false);
    const callback = (enteries) => {
        enteries.forEach(entry => {
            let ele = entry.target.childNodes[0].childNodes[0].childNodes[0];
            entry.target.childNodes[0].childNodes[1].setAttribute('class','hidden');
            console.log(ele);
            ele.play().then(() => {
                if (!ele.paused && !entry.isIntersecting) {
                    ele.currentTime = 0;
                    ele.pause();
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, { threshold: 0.5 });
    useEffect(() => {
        const elements = document.querySelectorAll(".video");
        elements.forEach(element => {
            observer.observe(element);
        })
    });
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const res = await api.get("/post/getAllPost");
            console.log(res);
            if (res.status >= 200 && res.status <= 299) {
                setPosts(res.data.data);
                setLoading(false);
            } else if (res.status === 401) {
                setError("There Might Be Some Error While Fetching Data");
                setLoading(false);
            } else if (res.status === 501) {
                setError("Internal Error");
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    const handleUploadVideo = async (e) => {
        setUploading(true);
        try {
            const file = document.querySelector("#video").files[0];
            const data = new FormData();
            data.append("video", file);
            const res = await api.post("/video/videouplaod", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });
            if (res.status === 201) {
                window.alert("Added Video");
                setUploading(false);
            } else {
                window.alert("Unable To Add Video");
                setUploading(false);
            }
        } catch (err) {
            window.alert(err.message);
        }
    }
    const handleUploadButtonClick = () => {
        console.log(document.querySelector(".upload").childNodes[0]);
        document.querySelector(".upload").childNodes[0].click();
    }
    return (
        userData.user ? <div className='flex flex-col w-full h-full justify-center items-center mt-8'>
            <div>
                <form encType="multipart/form-data">
                    <Input onChange={handleUploadVideo} className = 'upload hidden' type='file' id="video" variant='outlined'></Input>
                    <Button variant = "outlined" className = 'mb-2 w-64 h-12' onClick={handleUploadButtonClick} disabled={uploading}>{!uploading ? "Upload" : "Uploading..."}</Button>
                </form>
            </div>
            {loading ? <CircularProgress />:
                posts ? <div className='flex flex-col justify-between items-center videocontainer'>
                    {posts.map(post => {
                        return (
                            <div className='video'>
                                <Videos post={post}></Videos>
                            </div>
                        )

                    })}
                </div> : <div></div>}
        </div> : <Navigate to='/login'></Navigate>
    )
}

export default Feed