import './UserCard.css'


export default function UserCard(props) {
  const {user} = props;

  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      <span>{user.name}</span>

    </div>
  )
}