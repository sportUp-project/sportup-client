import './Navbar.css'
import { AuthContext } from '../../context/auth.context'
import {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import SportsDropdwon from '../SportsDropdown/SportsDropdown'
import axios from 'axios'

export default function Navbar(props) {
  const {user, isLoggedIn, logOutUser} = useContext(AuthContext)
  const [sports,setSports] = useState([])
  const navigate = useNavigate();
  function handleLogOut(e) {
    e.preventDefault();
    logOutUser()
    navigate('/')
  }


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => {  
      const sportsList = response.data
          sportsList.sort((a,b)=> {
            return b.activities.length - a.activities.length
          })
      setSports(sportsList)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="main-navbar">
      <div>
        <Link  to={"/"}><p className='logo'><span>Sport</span>UP</p></Link>
        <Link  to={"/activities"}>Activities</Link>
        <SportsDropdwon  sports={sports}/>
      </div>
      
      {!isLoggedIn && 
        <div className='user-navigation'>
          <Link to={"/login"}>Log in </Link>
          <Link to={"/signup"}>Sign up</Link>
       </div>}
      {isLoggedIn &&
      <div className='user-navigation'>
          <Link className='add-activity' to={`/activities/add`}>+</Link>
          <button onClick={handleLogOut}>Log out</button>
          <Link  to={`/profile/${user._id}`} >Profile</Link>
      </div>
      }
    </div>
  )
}