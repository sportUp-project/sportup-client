import './UserCard.css'


export default function UserCard(props) {
  const {user} = props;

  return (
    <div className="user-card" style={{backgroundImage : `url(${user.image})`}}>
    </div>
  )
}