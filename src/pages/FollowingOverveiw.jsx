import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList/ActivitiesList";
import axios from "axios";
import SportsList from "../components/SportsList/SportsList";
import "./FollowingOverveiw.css";

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
        const follows = response.data.user.follows;
        setUserFollows(follows);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);

  if (userFollows === null) {
    return <span>Loading</span>;
  }

  return (
    <div className="following-page-holder">
      {userFollows.map((user) => {
        return (
          <div className="following-user-holder" key={user._id}>
            <div className="user-info">
              <div className={"user-logo"}>
                <img src={user.image} alt={user.name} />
                <h3>{user.name}</h3>
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
            <div className="joined-by-following">
              <h4>Member of activities</h4>
              <ActivitiesList activities={user.joinedActivities} />
            </div>
          </div>
            </div>
        );
      })}
    </div>
  );
}

export default FollowingOverveiw;
