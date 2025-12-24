import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/.navbar.css";

function Navbar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); // always call
  };

  return (
    <header>
      <nav className="navbar">
        <h2 className="logo">Bloggle</h2>

        <input
          type="text"
          placeholder="Search blogs..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />

        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-btn">Create</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
