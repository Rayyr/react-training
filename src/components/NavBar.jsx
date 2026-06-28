import React from "react";
import {  NavLink } from "react-router-dom";

function NavBar({ isBlocked }) {
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

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🎓 Student System</h2>
      <div style={styles.links}>
        <NavLink
          onClick={(e) => isBlocked && e.preventDefault()}
          style={(e) => {
            if (e.isActive === true)
              return { ...styles.link, color: "#9C27B0" };
            else return styles.link;
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          onClick={(e) => isBlocked && e.preventDefault()}
          style={(e) => {
            if (e.isActive === true)
              return { ...styles.link, color: "#9C27B0" };
            else return styles.link;
          }}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          onClick={(e) => isBlocked && e.preventDefault()}
          style={(e) => {
            if (e.isActive === true)
              return { ...styles.link, color: "#9C27B0" };
            else return styles.link;
          }}
          to="/students"
        >
          Students
        </NavLink>
        <NavLink
          onClick={(e) => isBlocked && e.preventDefault()}
          style={(e) => {
            if (e.isActive === true)
              return { ...styles.link, color: "#9C27B0" };
            else return styles.link;
          }}
          to="/register"
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
