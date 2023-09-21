import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Showevents.css";

const UserEvents = ({ user }) => {
  const [userEvent, setUserEvents] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useRef();
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getPaginatedUser();
    currentPage.current = 1;
  }, []);

  const getPaginatedUser = () => {
    fetch(
      `http://localhost:3000/userEvents/${user._id}?page=${currentPage.current}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("dat form the server ", data.events);
        setUserEvents(data.events.event);
        setPageCount(data.events.pageCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageClick = (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUser();
  };

  const handleLimitChange = (e)=>{
     getPaginatedUser();
  }


  if (userEvent.length == 0) {
    return <h3>No Event to show. Kinldy register your event first</h3>;
  }

  return (
    <div className="userevents">
      <div className="">
        <h2>Your Events</h2>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name of Event</th>
              <th>Event Type</th>
              <th>City Name</th>
              <th>Hotel Name</th>
              <th>Posted At</th>
              <th>Event Date</th>
              <th>No. of People</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userEvent.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.eventType}</td>
              <td>{event.eventCity}</td>
              <td>{event.hotelName}</td>
              <td>{new Date(event.createdAt).toLocaleDateString()}</td>              
              <td>{new Date(event.eventDate).toLocaleDateString()}</td>              
              <td>{event.numberOfPeople}</td>
              <td>{event.eventStatus}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
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
        <option value="5">4</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
       <button onClick={handleLimitChange} className="btn btn-primary" >Set Limit</button>
    </div>
  );
};

export default UserEvents;
