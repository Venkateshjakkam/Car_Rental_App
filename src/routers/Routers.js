import React,{ useState ,useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { auth } from "../firebase";

const Routers = () => {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });


  return (
    <Routes>
        <Route
                path="/"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
