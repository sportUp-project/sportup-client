import { useState, useContext } from 'react'
import './FollowBtn.css'
import axios from 'axios'
import { AuthContext } from '../../context/auth.context'
import { useParams } from 'react-router-dom'



function FollowBtn() {


    const storedToken = localStorage.getItem('authToken')
    const [ follow, setFollow ] = useState(false)
    const { id } = useParams()
    const followUser = () => {   

     
        axios.put (
            `${process.env.REACT_APP_API_URL}/profile/${id}/follow`, 
            {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(()=> {
                setFollow(true)
            })            
            .catch(err => console.log(err))
    }

    const unfollowfollowUser = () => {   
     
        axios.put (
            `${process.env.REACT_APP_API_URL}/profile/${id}/unfollow`, 
            {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(()=> {
                setFollow(false)
            })            
            .catch(err => console.log(err))
    }


    if (follow !== true ) {
        return (
            <button className="btn-follow" onClick = {followUser}>Follow</button>
        ) 
    }

    return (
            
        <button className="btn-follow" onClick = {unfollowfollowUser}>Unfollow</button>
   
        
    )
}

export default FollowBtn; 