import React, { useEffect } from "react";

export default function NavBar() {
  return (
    <nav>
        <div className="logo">
          <h2>
            <a href="#">ONSHOP</a>
          </h2>
        </div>
        <ul className="nav-items">
          <li>
            <a href="">Cart</a>
          </li>
          <li>
            <a href="">Sign In</a>
          </li>
        </ul>
    </nav>
  );
}
