import { useState } from "react";

import "./ProfileDetails.css";
import FollowBtn from "../FollowBtn/FollowBtn";
import FollowersList from "../FollowersList/FollowersList";
import { Link } from "react-router-dom";
import SportCard from "../SportCard/SportCard";
import ActivityCard from "../ActivityCard/ActivityCard";


export default function ProfileDetails(props) {
  const { userInfo, user, setUserInfo } = props;
  const [ showList, setShowList ] = useState(false)
  const toggleShowList = () => {
    setShowList(!showList);
  };

  const [ showListFollowing, setShowListFollowing ] = useState(false)
  const toggleShowListFollowing = () => {
    setShowListFollowing(!showListFollowing);
  };

  console.log(userInfo)
 
  return (
    <div className="profile-holder">
      <h4>{userInfo.name}</h4>
      <img className="profile-image" src={userInfo.image} alt="profile" />
      { userInfo.followers.length > 0 && 
          <>
          <div onMouseEnter={toggleShowList}
              onMouseLeave={toggleShowList}>
                <p>Followed by: {userInfo.followers.length}</p> 
          </div>
          { showList && <FollowersList followers={userInfo.followers} /> }
        </>      
      }
      { userInfo.follows.length > 0 &&
        <>
          <div onMouseEnter={toggleShowListFollowing}
              onMouseLeave={toggleShowListFollowing}>
                <Link to={`/profile/${userInfo._id}/following`}> Follows: {userInfo.follows.length}</Link> 
          </div>
          { showListFollowing && <FollowersList followers={userInfo.follows} /> }
        </> 

      }
      {userInfo._id !== user._id && <FollowBtn userInfo={userInfo} user={user} setUserInfo={setUserInfo}/>}
       
       

      <h4>Description: {userInfo.description}</h4>

      <h4>Sports: </h4>
      {/* {userInfo.sports.map((sport)=> {
        return <div key={sport._id}>
          <img src={sport.iconUrl} alt={sport.name} />
          <p>{sport.name}</p>
        </div>
      })} */}
      <div className="sports-holder">
        {userInfo.sports.map(sport => {
          return (
            <SportCard sport={sport} />
          )
        })}
      </div>
      <h4>Joined Activites:</h4>
      <div className="profile-activities-holder">
        {userInfo.joinedActivities.map((activity)=> {
          return <ActivityCard  key={activity._id} activity={activity} />
        })}
      </div>
      <h4>User created activities:</h4>
      {userInfo.userActivities.map((activity)=> {
        return <Link to={`/activities/${activity._id}`} key={activity._id}>{activity.name}</Link>
      })}

    </div>
  );
}
