import { Link } from "react-router-dom"
import './PageNotFound.css'

export default function PageNotFound(props) {
  return (
    <div className="404page">
      <h3>Ooops! This page doesn't exist!</h3>
      <h3>But you can always go back to our <Link className="back-to-main" to={'/'}>Main Page</Link></h3>
    </div>
  )
}