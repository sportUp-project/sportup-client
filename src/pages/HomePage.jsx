import {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ActivitiesList from '../components/ActivitiesList/ActivitiesList';
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const {user} = useContext(AuthContext)
  const [ searchedData, setSearchedData ] = useState(null)
  const [ search, setSearch ] = useState('')
  const [ sports, setSports ] = useState('')
  const navigate = useNavigate()
  function handleRouting(e) {
    navigate(`activities/`)
  }

  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
        .then(response => {
          const sportsList = response.data
          sportsList.sort((a,b)=> {
            return a.activities.length - b.activities.length
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

  if (searchedData === null || sports === null){
    return <span>Loading</span>;
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
      
      {user &&
        <h2>{'Welcome back '+ user.name + '!'}</h2>
      }   

      {sports.map(sport => {
        return <div className="sport-card" key={sport._id} onClick={handleRouting}>
          <img src={sport.iconUrl} alt={sport.name} />
          <span>{sport.name}</span>
        </div>
      } )}

      <h2>Find your next aport activity and connect</h2>
      <input value={ search } type="text" placeholder="Search by sport or activity..." onChange={handleInput} />
        
        {!user ? 
        <div>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
        </div>
         :
        <div>
          <Link to={`profile/${user._id}/`}>Profile</Link>
          <Link to='/logut'>Log out</Link>
        </div>
        }
        { data &&
          <ActivitiesList activities={data} />
        }

    </div>
  )
}