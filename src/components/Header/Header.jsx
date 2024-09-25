import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);

  // Function to fetch user data
  const fetchUserData = async (user) => {
    console.log("Fetching user data for user: ", user.uid);
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("User details fetched: ", docSnap.data());
        } else {
          console.log("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    
  };

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Fetch user Data", user)
        fetchUserData(user); 
      } else {
        console.log("Fetch user Data no user has been noted yet")
        setUserDetails(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUserDetails(null); 
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <header className="header">

      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
          <Col>
          <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +91-9125550149
                </span>
              </div>
            </Col>
            {userDetails ? (
              <h3 style={{ color: "white" }}>
                Welcome {userDetails?.firstName}
              </h3>
            ) : (
              <h3 style={{ color: "white" }}>Welcome </h3>
            )}




          {/* <Col lg="6" md="6" sm="6">
     <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
     {!userDetails ? (
      <Link to="/login" className="btn login-btn d-flex align-items-center gap-1">
        <i className="ri-login-circle-line"></i> Login
      </Link>
      ) : (
        <Link
        to="/home"
        className="btn logout-btn d-flex align-items-center gap-1"
        onClick={logOut}
      >
           <i className="ri-login-circle-line"></i> LogOut
      </Link>
    )}
      <Link to="/register" className="btn register-btn d-flex align-items-center gap-1">
      <i className="ri-user-line"></i> Register
    </Link>
  </div>
</Col> */}


             
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {!userDetails ? (
                  <Link to="/login" className="d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Login
                  </Link>
                ) : (
                  <Link
                    to="/home"
                    className="d-flex align-items-center gap-1"
                    onClick={logOut}
                  >
                    <i className="ri-login-circle-line"></i> LogOut
                  </Link>
                )}
                <Link to="/register" className="d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link
                    to="/home"
                    className="d-flex align-items-center gap-2"
                  >
                    <i className="ri-car-line"></i>
                    <span>
                      Car Rental <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Delhi-101010</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className="d-flex align-items-center justify-content-end"
            >
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "nav__active nav__item"
                        : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
