import './UserCard.css'
import { Link } from 'react-router-dom';


export default function UserCard(props) {
  const {user, useDetails} = props;

  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      {useDetails &&  <span>{user.name}</span> }
      
    </div>
  )
}