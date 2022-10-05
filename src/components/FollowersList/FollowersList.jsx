import UserCard from "../UserCard/UserCard"
export default function FollowersList(props) {
    const { followers } =  props
    return(
        <div className='followers-list'>
            {followers.map(follower => {

                return (
                    <UserCard user={follower} />
                )
            })}
        </div>
    )
}