import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from './ThemeContext';
import { Divider, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/navbar.css';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const headingColor = theme === 'light' ? '#000000' : '#ffffff';
  const accentColor = theme === 'light' ? 'tomato' : '#ff6347';
  const footerBgColor = theme === 'light' ? '#f8f9fa' : '#343a40';

  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/';

  const [tutorials, setTutorials] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch tutorials from the API
  const fetchTodos = async () => {
    await axios
      .get(baseUrl + 'api/categories/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        setTutorials(res.data);
      });
  };

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the search page
    navigate('/search'); // Change '/search' to your search page route
  };

  return (
    <>
      <div className="navbar-container" style={{ backgroundColor: footerBgColor }}>
        <a href="/" className="navbar-brand">
          <div className="brand-content">
            <h2 className="fw-bold" style={{ margin: 0, color: headingColor }}>Acadamic</h2>
            <h2 className="fw-bold" style={{ margin: 0, color: accentColor }}>Folio</h2>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center' }} className="ms-auto">
          <IconButton
            onClick={handleSearchSubmit}
            sx={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </div>

      </div>
      <Divider sx={{ borderColor: accentColor }} />

      {/* Fixed list container */}
      <div className="fixed-list-container">
        <ul
          className="text-white"
          style={{
            listStyle: 'none',
            display: 'flex',
            padding: 0,
            margin: 0,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {tutorials.map((tut) => (
            <li>
              <a
                key={tut.id}
                href={`/tutorials/${tut.url}`}
                className="nav-links"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                {tut.name}
              </a>
            </li>
          ))}

          {/* Add more items here if needed */}
        </ul>
      </div>

    </>
  );
};

export default Navbar;
