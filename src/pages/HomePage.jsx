import {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ActivitiesList from '../components/ActivitiesList/ActivitiesList';
//import { useNavigate } from 'react-router-dom'
import SportsList from '../components/SportsList/SportsList';
import './HomePage.css'

export default function Homepage() {
  const {user} = useContext(AuthContext)
  const [ searchedData, setSearchedData ] = useState(null)
  const [ search, setSearch ] = useState('')
  const [ sports, setSports ] = useState('')
  
  // const navigate = useNavigate()
  // function handleRouting(e) {
  //   navigate(`activities/`)
  // }

  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
        .then(response => {
          const sportsList = response.data
          sportsList.sort((a,b)=> {
            return b.activities.length - a.activities.length
          }).splice(4)

          return setSports(sportsList)
        })
        .catch(err => console.log(err))
  }, []) 


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/activities`)
        .then(response => setSearchedData(response.data))
        .catch(err => console.log(err))
  }, []) 

  const handleInput = e => {
    setSearch(e.target.value);
  }

  if (searchedData === null){
    return <span>Loading</span>;
  }
  
 if (sports === null) {
   return <span>Loading</span>
 }
 
  const data = searchedData.filter((value) =>
   {
  if (search === '') {
    return null 
  }
  return (value.sport.name.toLowerCase().includes(search.toLowerCase()) || value.name.toLowerCase().includes(search.toLowerCase()))
  })
  

  return (
    <div className="main-container">
      <section className='center-main'>
      <h1><span>Sport</span>UP</h1>
        {user &&
          <h2>{'Welcome back '+ user.name + '!'}</h2>
        }   
        <SportsList sports={sports} />
        <h3>Find your next sport activity and connect</h3>
        <input value={ search } type="text" placeholder="Search by sport or activity..." onChange={handleInput} />
          
          {!user ? 
          <div className="btns">
            <Link to='/signup'>Sign Up</Link>
            <Link to='/login'>Login</Link>
          </div>
          :
          <div className="btns">
            <Link className='button' to={`profile/${user._id}/`}>Profile</Link>
            <Link className='button' to='/logut'>Log out</Link>
          </div>
          }
        </section>  
        { data &&
          <ActivitiesList activities={data} />
        }

    </div>
  )
}