import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Card from './Card/Card'
import "./NoPatientFound.css"

const NoPatientFound = () => {
  return (
    <div className='big-container'>
      <Sidebar></Sidebar>
      <Card></Card>
    </div>
  )
}

export default NoPatientFound
