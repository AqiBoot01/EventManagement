import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from 'axios';


function AllEvents() {
  const [data, setData] = useState([]);
  const [eventStatus, seteventStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const currentPage = useRef();
  const [pageCount , setPageCount] = useState(1);
  const [status , setStatus] = useState(true);

  useEffect(() => {
    getPaginatedEvents();
    currentPage.current = 1;
  }, [status, loading]);

  const getPaginatedEvents = () => {
    // Use the URL of your server endpoint
    fetch(`http://localhost:3000/allevents?page=${currentPage.current}&limit=${limit}`, {})
      .then((response) => response.json())
      .then((data) => {
        // console.log("dat form the server ", data.Events);
        setData(data.Events.events);
        setLoading(false);
        setPageCount(data.Events.pageCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handlePageClick = (e)=>{
    currentPage.current = e.selected + 1;
    getPaginatedEvents();

    
  }

  const handleLimitChange = (e)=>{
    getPaginatedEvents();
 }

  const handleAccept = (eventId) => {
    const confirmation = window.confirm(
      "Are you sure you want to Accept the Event?"
    );
    if (confirmation) {

      axios.put(`http://localhost:3000/acceptEvent/${eventId}` , {status: "Accepted"})
        .then(response=>{
          if (response.data.success) {
            toast.success("Event is Accepted");
          } else {
            toast.error("Server Error");
          }
          setStatus(!status);
          })
          .catch((error) => {
            console.error("Error Rejecting event:", error);
          });


      // Send a request to your backend to update the event status to "Accepted"
      // fetch(`http://localhost:3000/acceptEvent/${eventId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ status: "Accepted" }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.success) {
      //       toast.success("Event is Accepted");
      //     } else {
      //       toast.error("Server Error");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error Rejecting event:", error);
      //   });
    }
  };

  const handleCompleteEventButton = (eventId) =>{
    const confirmation = window.confirm(
      "Are you sure you want to Make Event Complete?"
    );
    if(confirmation){
      console.log(eventId)
      axios.put(`http://localhost:3000/completeEvent/${eventId}` , {status: "Completed"})
        .then(response=>{
          if (response.data.success) {
            toast.success("Event is Completed");
          } else {
            toast.error("Server Error");
          }
          setStatus(!status)
          })
          .catch((error) => {
            console.error("Error Completing Event:", error);
          });
    }
  }

  const handleReject = (eventId) => {
    const confirmation = window.confirm(
      "Are you sure you want to Reject the Event?"
    );
    if (confirmation) {
      // Send a request to your backend to update the event status to "Reject"
      fetch(`http://localhost:3000/rejectEvent/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Rejected" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Event is Rejected");
          } else {
            toast.error("Server Error");
          }
          setStatus(!status)
        })
        .catch((error) => {
          console.error("Error Rejecting event:", error);
        });
    }
  };

  return (
    <div className="userevents">
      <h2>Data Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Requested by</th>
              <th>Name of Event</th>
              <th>Event Type</th>
              <th>City Name</th>
              <th>Hotel Name</th>
              <th>Posted At</th>
              <th>Event Date</th>
              <th>No. of People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.eventName}</td>
                <td>{event.eventType}</td>
                <td>{event.eventCity}</td>
                <td>{event.hotelName}</td>
                <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td>{event.numberOfPeople}</td>
                <td>
                  {event.eventStatus === "Accepted" && event.eventComplete === 'Incomplete' ? (
                    <>
                    <button className="btn btn-success " disabled>
                      Accepted
                    </button>
                    <button className="btn btn-primary " 
                     onClick={()=>{handleCompleteEventButton(event._id)}}>
                      Complete
                    </button>
                    </>
                    
                  ) : event.eventStatus === "Rejected" ? (
                    <button className="btn btn-danger" disabled>
                      Rejected
                    </button>
                  ) :  event.eventComplete === "Completed" ? (
                    <button className="btn btn-success" disabled>
                      Completed
                    </button>
                  ) : (
                    <div className="d-flex">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAccept(event._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(event._id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<-"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />

<select
        className="form-select"
        id=""
        name="setLimit"
        value={limit}
        onChange={(e)=>{setLimit(e.target.value)}}
      >
        <option value="5">5</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
       <button onClick={handleLimitChange} className="btn btn-primary" >Set Limit</button>


    </div>
  );
}

export default AllEvents;
