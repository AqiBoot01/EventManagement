import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components

function Navbar() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        {/* Logo (Brand) */}
        <Navbar.Brand href="#">
          <img
            src="your-logo.png" // Replace with the actual path to your logo image
            width="40"
            height="40"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggler Button (for mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto"> {/* ml-auto pushes user elements to the right */}
            {/* User Icon */}
            <Nav.Link href="#">
              <i className="fas fa-user"></i>
            </Nav.Link>

            {/* User Name */}
            <Nav.Link href="#">John Doe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbar;
