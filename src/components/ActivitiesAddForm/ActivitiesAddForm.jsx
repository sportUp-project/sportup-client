import './ActivitiesAddForm.css'
import {useState} from 'react'
export default function ActivitiesAddForm(props) {

  


  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}></form>
  )
}