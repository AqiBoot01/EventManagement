import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const EventCartItem = (props) => {
  const { _id ,name, eventHotel, eventCity , eventImage } = props;
  // console.log(eventImage)
  // console.log(_id)
  const navigate = useNavigate()
  
//   console.log(props, 'this is form the cart component')

  

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="position-relative">
        <img src={`http://localhost:3000/uploads/eventImages/${eventImage}`} alt={name} className="img-fluid w-100" style={{ height: '300px', width: '300px' , objectFit:'cover' }} />
        <h5 className="position-absolute top-0 start-0 p-2 bg-primary text-white">{name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Hotel:</strong> {eventHotel}
        </p>
        <p className="card-text">
          <strong>City:</strong> {eventCity}
        </p>
        <Link to = {`/event/${_id}`} className='btn btn-primary'>Read More</Link>
      </div>
    </div>
  );
};

export default EventCartItem;
