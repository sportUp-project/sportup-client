import SportCard from "../SportCard/SportCard"
import './SportsList.css'
export default function SportsList(props) {
  const {sports} = props
  // to add : show only 5 most popular sports 
  // and create additional dropdown 
  return(
    <div className="sports-list">
      {sports.map(sport => {
        return (
            <SportCard key={sport._id} sport={sport} />
        )
      })}
    </div>
  )

}