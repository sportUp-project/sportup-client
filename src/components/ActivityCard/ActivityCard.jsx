import "./ActivityCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function ActivityCard(props) {
  const { activity } = props;
  const navigate = useNavigate();
  function renderDate() {
    return moment(activity.activityDate).format("MMM do YYYY, hh:mm A");
  }
  const dateFormatted = activity ? renderDate() : null;
  function renderDuration() {
    return moment.duration(activity.duration, 'hours').humanize()
  }
  const durationFormatted = activity? renderDuration() : null;

  function handleRouting(e) {
    navigate(`${activity._id}`);
  }
  return (
    <div className="activity-card" onClick={handleRouting}>
      <h3>{activity.name}</h3>
      <p>Description:{activity.description}</p>
      <p>Date:{dateFormatted}</p>

      <p>Duration: {durationFormatted}</p>
      <p>
        Joined by:{" "}
        {activity.members.map((member) => {
          return member.name;
        })}
      </p>
      {activity.creadyBy?.name && <p>Created by: {activity.creadedBy.name}</p>}
    </div>
  );
}
