import React from "react";
import "./Notification.css";

const Notification = ({ message, errorOccured }) => {
    if (message === null) {
      return null
    }
  
    if(errorOccured)
    {
      return (
        <div className='errorNotification'>
          {message}
        </div>
      )
    } else {
      return (
        <div className='notification'>
          {message}
        </div>
      )
    }
  }

export default Notification;