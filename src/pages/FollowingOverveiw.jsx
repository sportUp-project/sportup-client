import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import axios from "axios";

function FollowingOverveiw() {
    const { id } = useParams();
    const storedToken = localStorage.getItem("authToken");
    const [userFollows, setUserFollows] = useState(null); 

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/profile/${id}/following`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
            const follows = response.data.user.follows
            console.log(follows)
            setUserFollows(follows)})            
        .catch((err) => console.log(err));
    }, []);

    if (userFollows === null) {
        return <span>Loading</span>;
      }


    return ( 
        <div>
        {
            userFollows.map((user) => {
               return ( 
                <div key={user._id}>
                    <div className={"user-logo"} >
                        <img src={user.image} alt={user.name} />
                        <h3>{user.name}</h3>
                        <div> {
                            user.sports.map((sport) =>  {
                               return (
                                <div key={sport._id}>
                                    <img src={sport.iconUrl} alt={sport.name} />
                                </div>
                                )})   
                        } </div>
                    </div>
                    <h4>Created activities</h4>                    
                    { user.userActivities.length > 0 && <ActivitiesList activities={user.userActivities}/>}
                    <h4>Member of activities</h4>
                    <ActivitiesList activities={user.joinedActivities}/> 
                </div>
            )}) 
        }
        </div>
    )

}


export default FollowingOverveiw