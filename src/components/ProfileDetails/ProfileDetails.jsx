import { useState } from "react";

import "./ProfileDetails.css";
import FollowBtn from "../FollowBtn/FollowBtn";
import FollowersList from "../FollowersList/FollowersList";
import { Link } from "react-router-dom";
import SportCard from "../SportCard/SportCard";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import ActivitiesList from "../ActivitiesList/ActivitiesList";

export default function ProfileDetails(props) {
  const { userInfo, user, setUserInfo } = props;
  const {user: loggedUser} = useContext(AuthContext)
  const [ showList, setShowList ] = useState(false)
  const toggleShowList = () => {
    setShowList(!showList);
  };

  const [ showListFollowing, setShowListFollowing ] = useState(false)
  const toggleShowListFollowing = () => {
    setShowListFollowing(!showListFollowing);
  };

  if (userInfo === null) {
    return (
      <span>Loading...</span>
    )
  }
 
  return (
    <div className="profile-holder">
      <div className="profile-info">
        <h2>{userInfo.name}</h2>
        <img className="profile-image" src={userInfo.image} alt="profile" />
        {userInfo.followers.length > 0 && (
          <>
            <div onMouseEnter={toggleShowList} onMouseLeave={toggleShowList}>
              <p>Followed by: {userInfo.followers.length}</p>
            </div>
            {showList && <FollowersList followers={userInfo.followers} />}
          </>
        )}
        {userInfo.follows.length > 0 && (
          <>
            <div className="follow-div"
              onMouseEnter={toggleShowListFollowing}
              onMouseLeave={toggleShowListFollowing}
            >
              <Link to={`/profile/${userInfo._id}/following`}>
                {" "}
                Follows: {userInfo.follows.length}
              </Link>
            </div>
            {showListFollowing && (
              <FollowersList followers={userInfo.follows} />
            )}
          </>
        )}
        {userInfo._id !== user._id && (
          <FollowBtn
            userInfo={userInfo}
            user={user}
            setUserInfo={setUserInfo}
          />
        )}
        <p>Description: {userInfo.description}</p>
        <h4>Sports: </h4>
        <div className="sports-holder">
          {userInfo.sports.map((sport) => {
            return <SportCard key={sport._id} sport={sport} />;
          })}
        </div>
        {loggedUser._id === userInfo._id && <Link className="button" to={`/profile/${user._id}/edit`}>Edit profile </Link>}
      </div>
      <div className="profile-all-activities">
        <h4>Joined Activites:</h4>

          <ActivitiesList activities={userInfo.joinedActivities} />

        <h4>User created activities:</h4>
        {loggedUser._id === userInfo._id && <Link className="button" to={`/activities/add`}>Add an activity</Link>}


          <ActivitiesList activities={userInfo.userActivities} />

      </div>
      

    </div>
  );
}
