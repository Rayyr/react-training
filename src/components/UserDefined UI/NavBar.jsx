import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NavBar({ isBlocked }) {
  const currentLocation = useLocation();

  const [isOtherLink, setIsOtherLink] = useState(false);

  //////////////////////////////////
  useEffect(() => {
    //found routes
    const isHomePage1 = /^\/home\/?$/.test(currentLocation.pathname);
    const isHomePage2 = /^\/?$/.test(currentLocation.pathname);
    const isAboutPage = /^\/about\/?$/.test(currentLocation.pathname);
    const isStudentsPage = /^\/students\/?$/.test(currentLocation.pathname);
    const isRegisterPage = /^\/register\/?$/.test(currentLocation.pathname);

    // console.log(isHomePage1);
    //console.log(currentLocation.pathname);

    if (
      !isHomePage1 &&
      !isHomePage2 &&
      !isAboutPage &&
      !isRegisterPage &&
      !isStudentsPage
    )
      setIsOtherLink(() => true);
    else setIsOtherLink(() => false);
  }, [currentLocation]);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#1e293b",
      color: "white",
    },
    logo: {
      margin: 0,
    },
    links: {
      display: "flex",
      gap: "20px",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontWeight: "500",
    },
  };

  const avtiveLinkStyle = ({ isActive }) => {
    if (isOtherLink) {
      return styles.link;
    } else {
      return isActive ? { ...styles.link, color: "#9C27B0" } : styles.link;
    }
  };

  const handleClick = (e) => {
    if (isBlocked) {
      e.preventDefault();
    }
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🎓 Student System</h2>
      <div style={styles.links}>
        <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/">
          Home
        </NavLink>
        <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/about">
          About
        </NavLink>
        <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/students">
          Students
        </NavLink>
        <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
