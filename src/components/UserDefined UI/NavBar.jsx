import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { roles } from "../../constatnts/systemRoles";

function NavBar({ isBlocked }) {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [isOtherLink, setIsOtherLink] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //found routes
    const isWellcomePage = /^\/wellcome\/?$/.test(currentLocation.pathname);
     const isAboutPage = /^\/about\/?$/.test(currentLocation.pathname);
    const isStudentsPage = /^\/students\/?$/.test(currentLocation.pathname);
   
    if (
      !isWellcomePage &&
       !isAboutPage &&
      !isStudentsPage  
    )
      setIsOtherLink(() => true);
    else setIsOtherLink(() => false);

    if (currentLocation.pathname === "/") navigate("/home");
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
    <>
    {user&&(
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🎓 Student System</h2>
      <div style={styles.links}>
        {/* puplic accessability*/}
        

        <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/about">
          About
        </NavLink>

       

        {user.role === roles.admin && (
          <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/students">
            Students
          </NavLink>
        )}

        {(user.role === roles.admin || user.role === roles.student) && (
          <NavLink onClick={handleClick} style={avtiveLinkStyle} to="/wellcome">
            Wellcome
          </NavLink>
        )}
      </div>
    </nav>)}
    </>
  );
}

export default NavBar;
