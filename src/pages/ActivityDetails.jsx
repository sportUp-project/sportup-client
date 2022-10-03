import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Map, Marker } from "react-map-gl";
import moment from "moment";
import { AuthContext } from "../context/auth.context";

export default function ActivityDetails(props) {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  



  // fetch the data from server
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => {
        // navigate('/login')
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  // define the options for the map, later call it conditionally on load
  function renderMap() {
    return (
      <div className="map-holder">
        <Map
          initialViewState={{
            longitude: activity.location.long,
            latitude: activity.location.lat,
            zoom: 12,
          }}
          style={{ height: 300, width: 300 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker
            longitude={activity.location.long}
            latitude={activity.location.lat}
          ></Marker>
        </Map>
      </div>
    );
  }

  // create a formatted date with momentjs
  function renderDate() {
    return moment(activity.activityDate).format("MMMM do YYYY, hh:mm");
  }
  const dateFormatted = activity ? renderDate() : null;

  function handleJoin(e) {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/activities/${activity._id}/join`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => console.log(err));
  }
  function handleLeave(e) {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/activities/${activity._id}/leave`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => console.log(err));
  }

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/activities/${activity._id}/edit`)
  }

  //show loading while fetching the data
  if (activity === null) {
    return <span>Loading...</span>;
  }

  console.log(activity);
  console.log(user)

  console.log('filter if member has joined', activity.members.filter(member => member._id === user._id).length === 1)
  console.log('filter if user is not creator', activity.createdBy._id !== user._id)

  return (
    <div className="activity-details">
      <h4>{activity.name}</h4>
      <Link to={`/profile/${activity.createdBy._id}`}>
        <p>{activity.createdBy.name}</p>
      </Link>
      <p>
        <Link to={`/activities/sport/${activity.sport._id}`}>
          {activity.sport?.name}
        </Link>
      </p>
      <p>{activity.description}</p>
      <p>{dateFormatted}</p>
      <p>Duration: {activity.duration} hours</p>
      <p>Members joining:</p>

      {activity.members.map((member) => {
        return <p key={member._id}>{member.name}</p>;
      })}

      {activity.createdBy._id !== user._id && activity.members.filter(member => member._id === user._id).length === 0
      ? (
        <button onClick={handleJoin}>Join this activity</button>
      ) : (
        <button onClick={handleLeave}>Leave activity</button>
      )}

      

      {activity.createdBy._id === user._id && <button onClick={handleEdit}>Edit activity</button>}


      {/* conditionally render map to avoid errors */}
      {activity !== null && renderMap()}
    </div>
  );
}
