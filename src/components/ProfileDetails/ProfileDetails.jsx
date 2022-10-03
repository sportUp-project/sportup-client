import "./ProfileDetails.css";
import FollowBtn from "../FollowBtn/FollowBtn";


export default function ProfileDetails(props) {
  const { userInfo } = props;

  console.log(userInfo)
  return (
    <div className="profile-holder">
      <h4>{userInfo.name}</h4>
      <img src={userInfo.image} alt="profile" />
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
      { userInfo.followers.length > 0 && <p>Followers: {userInfo.followers.length}</p> }
      { userInfo.follows.length > 0 && <p>Followers: {userInfo.follows.length}</p> }
      
      <FollowBtn />
    </div>
  );
}
