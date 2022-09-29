import './Navbar.css'
import { AuthContext } from '../../context/auth.context'
import {useEffect,useState,useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar(props) {
  const {user, isLoggedIn, logOutUser} = useContext(AuthContext)
  const navigate = useNavigate();
  function handleLogOut(e) {
    e.preventDefault();
    logOutUser()
    navigate('/')
  }
  return (
    <div className="main-navbar">
      {!isLoggedIn && 
        <>
        <Link to={"/login"}>Log in </Link>
        <Link to={"/signup"}>Sign up</Link>
      </>}
      {isLoggedIn &&
      <>
        <button onClick={handleLogOut}>Log out</button>
        <Link to={`/profile/${user._id}`} >Profile</Link>
      </>
      }
    </div>
  )
}