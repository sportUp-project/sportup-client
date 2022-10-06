import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Map, Marker } from "react-map-gl";
import moment from "moment";
import UserCard from "../components/UserCard/UserCard";
import { AuthContext } from "../context/auth.context";
import './ActivityDetails.css'
import SportCard from "../components/SportCard/SportCard";
import { v4 as uuidv4 } from 'uuid';


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
        navigate("/login");
        console.log(err);
      });
    // eslint-disable-next-line
  }, [id]);

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
          mapStyle="mapbox://styles/mapbox/light-v10"
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
    return moment(activity.activityDate).format("MMM do YYYY, hh:mm A");
  }
  const dateFormatted = activity ? renderDate() : null;

  function renderDuration() {
    return moment.duration(activity.duration, "hours").humanize();
  }
  const durationFormatted = activity ? renderDuration() : null;

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
    navigate(`/activities/${activity._id}/edit`);
  }

  function handleDelete(e) {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/activities/${activity._id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/activities");
      })
      .catch((err) => console.log(err));
  }

  //show loading while fetching the data
  if (activity === null) {
    return <span>Loading...</span>;
  }

  function renderJoinButton() {
    return activity.createdBy._id !== user._id &&
      activity.members.filter((member) => member._id === user._id).length ===
        0 ? (
      <button className="button" onClick={handleJoin}>
        Join this activity
      </button>
    ) : (
      <button className="button" onClick={handleLeave}>
        Leave activity
      </button>
    );
  }

  return (
    <div className="activity-details-holder">
      <div className="activity-details-card">
        <div className="background-holder" style={{'backgroundImage':`url(${activity.sport.imageUrl})`}}>
          <div className="main-info-holder">
            <Link key={uuidv4()} to={`/profile/${activity.createdBy._id}`}>
              <UserCard key={uuidv4()} user={activity.createdBy} />
            </Link>
            
            <p>{activity.name}</p>
              <SportCard key={uuidv4()} sport={activity.sport} />
            <p>{activity.description}</p>
            <p>{dateFormatted}</p>
            <p>Duration: {durationFormatted}</p>


          </div>
              {/* conditionally render map to avoid errors */}
              {activity !== null && renderMap()}
        </div>
        <p>Members joining:</p>

        <div className="members-holder">

          {activity.members.slice(0,10).map((member) => {
            return <Link key={uuidv4()} to={`/profile/${member._id}`} > <UserCard user={member} /> </Link>;
          })}
        </div>

        <div className="button-holder">
          {activity.createdBy._id !== user._id && renderJoinButton()}

          {activity.createdBy._id === user._id && (
            <button className="button" onClick={handleEdit}>
              Edit activity
            </button>
          )}

          {activity.createdBy._id === user._id && (
            <button className="button" onClick={handleDelete}>
              Delete activity
            </button>
          )}
        </div>
      </div>


    </div>
  );
}
