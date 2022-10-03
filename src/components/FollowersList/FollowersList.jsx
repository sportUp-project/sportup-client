
export default function FollowersList(props) {
    const { followers } =  props
    return(
        <div className='followers-list'>
            {followers.map(follower => {
                return (
                    <div key={follower._id}>
                        <img src={follower.image} alt={follower.name}/>
                        <p>{follower.name}</p>
                    </div>
                )
            })}
        </div>
    )
}