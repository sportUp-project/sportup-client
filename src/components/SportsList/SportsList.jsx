
export default function SportsList(props) {
  const {sports} = props

  return(
    sports.map(sport => {
      return (
        <div className="sport-card">
          <h3>{sport.name}</h3>
          <img src={sport.iconUrl} alt={sport.name} />
        </div>
      )
    })
  )

}