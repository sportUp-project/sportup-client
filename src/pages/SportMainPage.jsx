import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
//import ActivityCard from '../components/ActivityCard/ActivityCard';
//import ActivitiesList from '../components/ActivitiesList/ActivitiesList';
//import Search from '../components/Search/Search';


function SportMainPage(props) {
    const {id} = useParams()
    const [sport,setSport] = useState(null)

   // const [activities, setactivities] = useState([])
   
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/sports/${id}`)
            .then(response => setSport(response.data))
            .catch(err => console.log(err))
    }, [])

    // useEffect(() => {
       

    if (sport === null) {
        return <span>Loading...</span>
      }

    return (
      <div className="sport-main"> 
        <img src={sport.iconUrl} alt={sport.name} />
        <img src={sport.imageUrl} alt={ `background ${sport.name}`} className='background-img sport-img'  />
        <h3>{sport.name}</h3>
        <span>{sport.activities.length} activities</span>
   
        {/* <Search activities={activities} /> */}

      </div>
    )
  
}

export default SportMainPage