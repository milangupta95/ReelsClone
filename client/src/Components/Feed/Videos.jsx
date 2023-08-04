import React from 'react'
import ReactDOM from 'react-dom';
import { Avatar } from '@mui/material';
import Authcontext from '../AuthContextProvider';
import { useContext, useState, useEffect } from 'react';
import { Button, IconButton, TextField } from '@mui/material'
import { InputBase } from '@mui/material';
import api from '../../utility';
function Videos(props) {
    const userData = useContext(Authcontext);
    const [commentShow, setcommentShow] = useState(false);
    const [allLikes, setallLikes] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [isUserLiked, setIsUserLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [countLikes, setCountLikes] = useState(0);
    const [error, setError] = useState("");
    const [myComment, setmyComment] = useState("");

    const makeComment = async () => {
        try {
            setAllComments([...allComments, {
                fullName: userData.user.data.user.fullName,
                email: userData.user.data.user.email,
                profilepic: userData.user.data.user.profilepic,
                text: myComment
            }]);
            const res = await api.post(`post/comment/createComment/${props.post.id}`, {
                text: myComment
            });
            if (res.status === 200) {
                console.log("Comment Added");
                setmyComment("");
            } else if (res.status === 400) {
                console.log("Unable to Comment");
            }
        } catch (err) {
            window.alert(err.message);
        }
    }

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const commentRes = await api.get(`post/comment/getComments/${props.post.id}`);
            const likeRes = await api.get(`post/likes/allLikes/${props.post.id}`);
            if (commentRes.status === 200 && likeRes.status === 200) {
                setallLikes(likeRes.data.likes);
                setAllComments(commentRes.data.comments);
                for (let i = 0; i < likeRes.data.likes.length; i++) {
                    if (likeRes.data.likes[i].id === userData.user.data.user.id) {
                        setIsUserLiked(true);
                    }
                }
                setCountLikes(likeRes.data.likes.length);
                setLoading(false);
            } else if (commentRes.status === 400 || likeRes.status === 400) {
                setError("Unable To Fetch Comments and Likes");
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const handleVideoClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    const handleScroll = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode.nextSibling;
        console.log(next);
        if (next) {
            console.log("Ended");
            next.scrollIntoView({ behavior: "smooth", inline: "nearest" });
            e.target.muted = true;
        }
        setcommentShow(false);
    }
    const handleLikeClick = async () => {
        if (!loading) {
            if (isUserLiked === false) {
                setIsUserLiked(true);
                setCountLikes(countLikes + 1);
                const res = await api.post(`post/likes/dolike/${props.post.id}`);
                if (res.status === 200) {
                    console.log("Liked Video");
                } else if (res.status === 400 || res.status === 500) {
                    console.log("Unable To Like Video");
                    setIsUserLiked(false);
                    setCountLikes(countLikes + 1);
                }
            } else {
                setIsUserLiked(false);
                setCountLikes(countLikes - 1);
                const res = await api.post(`post/likes/dontlike/${props.post.id}`);
                if (res.status === 200) {
                    console.log("Unliked Video");
                } else if (res.status === 400) {
                    console.log("Unable To Unlike Video");
                    setIsUserLiked(true);
                    setCountLikes((count) => count + 1);
                }
            }
        }
    }

    const handleCommentClick = () => {
        setcommentShow(!commentShow);
    }
    return (
        <div className='flex flex-col justify-center items-center sm:flex-row mb-10'>
            {props.post ? <div className='flex flex-col items-center justify-center'>
                <video onEnded={handleScroll} className='w-[100vw] h-[72vh] sm:w-[35vw] sm:h-[72vh] shadow-sm shadow-grey-800' onClick={handleVideoClick} muted autoPlay>
                    <source src={`http://localhost:8080/video/${props.post.video_url}`}></source>
                </video>
                <div className='w-full shadow-lg shadow-grey-800 px-5 flex justify-between items-center mb-5 h-[50px]'>
                    <div className='flex'>
                        <Avatar alt="Remy Sharp" src={props.post.profilepic} />
                        <span className='h-fit mx-2 text-sky-800 bg-slate-300 p-2'>{props.post.fullName}</span>
                        <Button>Follow</Button>
                    </div>

                    {loading ? <div>Loading...</div> : <div className='flex'>
                        <div onClick={handleLikeClick} className="flex mr-5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isUserLiked ? ' #0284c7' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                            <span className='bg-sky-200 text-white text-center h-6 w-6 rounded-full'>{countLikes}</span>
                        </div>
                        <div onClick={handleCommentClick} className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                    </div>}
                </div>
            </div> : <div>Loading...</div>}
            <div className={commentShow ? "overflow-y-scroll z-[100] w-[75vw] h-[40vh] sm:my-[0] mt-[-100%] sm:py-5 sm:w-[25vw] sm:h-[72vh] rounded-lg text-white bg-[#1c1c1b] relative" : "hidden"}>
                <div className='flex items-center border-b-2 justify-between px-2'>
                    <h1 className='text-xl font-bold  mb-2 border-white border-b-3'>Comments</h1>
                    <IconButton onClick={handleCommentClick} className='text-white'><span class="material-symbols-outlined cursor-pointer">
                        close
                    </span></IconButton>
                </div>
                {loading ? <div>Loading...</div> : allComments ? 
                <div className=''>
                    {allComments.map(comment => {
                        return (
                            <div className='flex py-1 border-b-2 border-gray-400 w-full'>
                                <div className='px-2'>
                                    <Avatar src={comment.profilepic}></Avatar>
                                </div>
                                <div className=' border-white'>
                                    <div className='text-sky-700 cursor-pointer'>{comment.fullName}</div>
                                    <div>{comment.text}</div>
                                </div>
                            </div>
                        )
                    })}
                </div> : <div className='px-2'>No Comments To Show</div>
                }
                <div class='flex sm:flex-row flex-col px-2 absolute bottom-0'>
                    <div className='flex'>
                        <Avatar alt="Remy Sharp" src={userData.user.data.user.profilepic} className='mr-2' />
                        <InputBase placeholder="Comment" value={myComment} onChange={(e) => setmyComment(e.target.value)} className='border-b-2 mb-2 text-white text-xl w-[200px] border-white' id="standard-basic" label="Comment" variant="standard" />
                    </div>
                    <Button onClick={makeComment}>Comment</Button>
                </div>
            </div>
        </div>
    )
}

export default Videos