import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Search from '../components/Search/Search';
import { AuthContext } from "../context/auth.context";
import SportCard from '../components/SportCard/SportCard';
import './SportMainPage.css'
import LoadingSpiral from '../components/LoadingSpiral/LoadingSpiral';


function SportMainPage(props) {
    const { user } = useContext(AuthContext);
    const {id} = useParams()
    const [sport,setSport] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/sports/${id}`)
            .then(response => setSport(response.data))
            .catch(err => console.log(err))
    }, [id])

  
    if (sport === null) {
        return <span><LoadingSpiral/></span>
      }

    return (
      <div className="sport-main"  > 
        <div className="sport-data" style={{'backgroundImage':`url(${sport.imageUrl})`}} >
          <div  className="data-container"> 
            <SportCard sport={sport} />
            <div className="sport-details">
              <h2>{sport.name}</h2>
              <h3>Total activities: {sport.activities.length}</h3>
              {user && <Link to={`/activities/add`}>Add</Link>}
            </div>
          </div>
          
        </div>
        
          <Search searchedData={ sport.activities } />
          
             
        
      </div>
    )
  
}

export default SportMainPage