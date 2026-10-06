import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📦 BorrowBox
        </Link>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/items">Browse Items</NavLink>
          </li>
          <li>
            <NavLink to="/add-item">Add Item</NavLink>
          </li>
          <li>
            <NavLink to="/my-items">My Items</NavLink>
          </li>
          <li>
            <NavLink to="/requests">Requests</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
