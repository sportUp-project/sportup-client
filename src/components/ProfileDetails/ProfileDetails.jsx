import { useState } from "react";

import "./ProfileDetails.css";
import FollowBtn from "../FollowBtn/FollowBtn";
import FollowersList from "../FollowersList/FollowersList";



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
      <img src={userInfo.image} alt="profile" />
      { userInfo.followers.length > 0 && 
          <>
          <div onMouseEnter={toggleShowList}
              onMouseLeave={toggleShowList}>
                <p>Folowers: {userInfo.followers.length}</p> 
          </div>
          { showList && <FollowersList followers={userInfo.followers} /> }
        </>      
      }
      { userInfo.follows.length > 0 &&
        <>
          <div onMouseEnter={toggleShowListFollowing}
              onMouseLeave={toggleShowListFollowing}>
                <p>Follows: {userInfo.follows.length}</p> 
          </div>
          { showListFollowing && <FollowersList followers={userInfo.follows} /> }
        </> 

      }
      {userInfo._id !== user._id && <FollowBtn userInfo={userInfo} user={user} setUserInfo={setUserInfo}/>}
       
       

      <h4>Description: {userInfo.description}</h4>

      <h4>Sports: 
      {userInfo.sports.map((sport)=> {
        return <div key={sport._id}>
          <img src={sport.iconUrl} alt={sport.name} />
          <p>{sport.name}</p>
        </div>
      })}
      </h4>
      <h4>Joined Activites:
      {userInfo.joinedActivities.map((activity)=> {
        return <p key={activity._id}>{activity.name}</p>
      })}
      </h4>
      <h4>User created activities: 
      {userInfo.userActivities.map((activity)=> {
        return <p key={activity._id}>{activity.name}</p>
      })}
      </h4>

    </div>
  );
}
