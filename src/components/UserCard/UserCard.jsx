import './UserCard.css'


export default function UserCard(props) {
  const {user} = props;
  const randomRoundNumber = Math.floor(Math.random()+1)

  return (
    <div className="user-card" style={{backgroundImage : `url(${user.image})`}}>
      {/* <img src={user.image} alt={user.name} /> */}
    </div>
  )
}