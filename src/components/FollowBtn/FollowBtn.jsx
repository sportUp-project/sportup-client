import { useState } from 'react'
import './FollowBtn.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'



function FollowBtn(props) {
    const { userInfo, user, setUserInfo } = props
    console.log(userInfo)
    console.log(user)
    const storedToken = localStorage.getItem('authToken')
 
    const { id } = useParams()

    const followUser = () => { 

        axios.put (
            `${process.env.REACT_APP_API_URL}/profile/${id}/follow`, 
            {},
            {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response)=> {
                console.log(response.data)                
                setUserInfo(response.data)
            })            
            .catch(err => console.log(err))
    }

    const unfollowfollowUser = () => {   
     
        axios.put (
            `${process.env.REACT_APP_API_URL}/profile/${id}/unfollow`,
            {}, 
            {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response)=> {
                console.log(response.data)                
                setUserInfo(response.data)
            })            
            .catch(err => console.log(err))
    }
    if (userInfo.followers.filter(fol => fol._id === user._id).length !== 0 ) {
        return (
            <button className="btn-follow" onClick = {unfollowfollowUser}>Unfollow</button>
        ) 
    }
    return (
        <button className="btn-follow" onClick = {followUser}>Follow</button>
    )
}

export default FollowBtn; 