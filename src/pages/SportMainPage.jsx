import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Search from '../components/Search/Search';
import { AuthContext } from "../context/auth.context";



function SportMainPage(props) {
    const { user } = useContext(AuthContext);
    const {id} = useParams()
    const [sport,setSport] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/sports/${id}`)
            .then(response => setSport(response.data))
            .catch(err => console.log(err))
    }, [])

  
    if (sport === null) {
        return <span>Loading...</span>
      }

    return (
      <div className="sport-main"> 
        <img src={sport.iconUrl} alt={sport.name} />
        <img src={sport.imageUrl} alt={ `background ${sport.name}`} className='background-img sport-img'  />
        <h3>{sport.name}</h3>

        <Search searchedData={ sport.activities } />
        {user && <Link to={`/activities/add`}>Add an activity</Link>}
      </div>
    )
  
}

export default SportMainPage