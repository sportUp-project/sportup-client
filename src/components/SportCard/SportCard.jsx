import './SportCard.css'
import { useNavigate } from 'react-router-dom'

export default function SportCard(props) {
  const {sport} = props
  const navigate = useNavigate()
  function handleRouting(e) {
    navigate(`sport/${sport._id}`)
  }

  return (
    <div className="sport-card" onClick={handleRouting}>
      <img src={sport.iconUrl} alt={sport.name} />
      <h3>{sport.name}</h3>
    </div>
  )
}