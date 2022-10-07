import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import axios from "axios";
import SportsList from "../components/SportsList/SportsList";
import "./FollowingOverveiw.css";
import LoadingSpiral from "../components/LoadingSpiral/LoadingSpiral";
import SearchUsers from "../components/SearchUsers/SearchUsers";

function FollowingOverveiw() {
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const [userFollows, setUserFollows] = useState(null);
  const [ users, setUsers ] = useState(null);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile/${id}/following`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const follows = response.data.user.follows;
        setUserFollows(follows);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/profile/users`, 
      {headers: {Authorization: `Bearer ${storedToken}`}}
      )
      .then((response) => {
        const serchecdUsers = response.data;
        setUsers(serchecdUsers);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);

  if (userFollows === null || users === null ) {
    return <span><LoadingSpiral/></span>;
  }

  return (
    <div className="following-page-holder">
      <div className="search-friend">
      <SearchUsers searchedData={users}/>
      </div> 
      {userFollows.map((user) => {
        return (
          <div className="following-user-holder" key={user._id}>
            <div className="user-info">
              <div className={"user-logo"}>
                <img src={user.image} alt={user.name} />
                <h3>{user.name}</h3>
                <p>{user.description}</p>
                <p><strong>Following: </strong>{user.follows.length}</p>
                <p><strong>Followed by: </strong>{user.followers.length}</p>
              </div>
                <SportsList sports={user.sports} />
            </div>
            <div className="activities-of-following">

            <div className="created-by-following">
              <h4>Created activities</h4>
              {user.userActivities.length > 0 && (
                <ActivitiesList activities={user.userActivities} />
              )}
            </div>
            {user.joinedActivities.length!==0 && <div className="joined-by-following">
              <h4>Member of activities</h4>
              <ActivitiesList activities={user.joinedActivities} />
            </div>}
          </div>
            </div>
        );
      })}
    </div>
  );
}

export default FollowingOverveiw;
