import './SportsDropdown.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SportsDropdown(props) {
  const {sports} = props
  const [chosenSport,setChosenSport] = useState('')

  const navigate = useNavigate()
  function handleChange(e) {
    e.preventDefault();
    navigate(chosenSport)
  }

  // later fix issue with already preselected sport not working
  return (
    <form onSubmit={handleChange}>
      <select name='dropdown' id='dropdown' onChange={e => setChosenSport(e.target.value)} defaultValue="-- select a sport --">
        <option disabled> -- select a sport -- </option>
        {sports.map(sport => {
          return (
            <option key={sport._id} value={`sport/${sport._id}`}>{sport.name} : ({sport.activities?.length})</option>
          )
        })}
      </select>
      <button className='button' type='submit'>Go to sport</button>
    </form> 
  )
}