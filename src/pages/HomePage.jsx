import {useState, useEffect, useContext} from 'react'
import { AuthContext } from "../context/auth.context";



export default function Homepage(props) {
  const {user, isLoggedIn, isLoading } = useContext(AuthContext)

  return (
    <div className="main-container">
      {user ? <span>{'Hello ' + user.name}</span> : <span>Not logged in?</span>}
    </div>
  )
}