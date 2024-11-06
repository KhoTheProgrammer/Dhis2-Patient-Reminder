import React from 'react'
import Sidebar from '../../assets/sidebar/Sidebar'
import TableMessage from './Table'
import "./SendMessage.css"

const SendMessage = () => {
  return (
    <div className='sendmessage-container'>
      <Sidebar></Sidebar>
      <TableMessage></TableMessage>
    </div>
  )
}

export default SendMessage
