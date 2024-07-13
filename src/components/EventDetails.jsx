// טיפול באיורע מסוים 
import React from 'react';

const EventDetails = ({ event, onClose }) => {
  return (
    <div className="event-details">
      <button className="close-button" onClick={onClose}>חזור</button>// call to this function when user click on back button 
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  );
};

export default EventDetails;
