
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';


function NewEvent () {
const {id} = useParams()
const [loading, setLoading] = useState(true);
const [data , setData] = useState([]);



useEffect(() => {
    getEventInto();
}, []);

const getEventInto =()=>{
  axios.get(`http://localhost:3000/eventDetails/${id}`)
    .then(response=>{
      setData(response.data.Event);
        setLoading(false);
    })
    .catch(error=>{console.log(error)})

  };

  const backgroundImageStyle = {
    backgroundImage: `url(http://localhost:3000/uploads/eventImages/${data.eventImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '700px', // Adjust the height as needed
  };

  return (
    <div className="card mb-4">
      <div style={backgroundImageStyle} className="card-bg-image"></div>
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">
          <strong>City:</strong> {data.eventCity}
        </p>
        <p className="card-text">
          <strong>Hotel:</strong> {data.eventHotel}
        </p>
        <p className="card-text">
          <strong>Description:</strong> {data.createdAt}
        </p>
      </div>
    </div>
  );
}

export default NewEvent;