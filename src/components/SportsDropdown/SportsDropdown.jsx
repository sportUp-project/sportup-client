import './SportsDropdown.css'
import { useNavigate } from 'react-router-dom'

export default function SportsDropdown(props) {
  const {sports} = props
  const navigate = useNavigate()
  function handleChange(e) {
    navigate(e.target.value)
  }
  return (
    <select name='dropdown' id='dropdown' onChange={handleChange}>
      {sports.map(sport => {
        return (
          <option value={`sport/${sport._id}`} onSelect>{sport.name}</option>
        )
      })}
    </select>
  )
}