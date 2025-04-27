// src/assets/pages/Error404.jsx
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../css/error.css";
import error404Image from "../img/4042.png";

const NoFound = () => {
  return (
    <div className="body">
      <h1 className="text-center mt-3 mb-3 pulsating text-white">
        Oops! Page not found
      </h1>
      <div className="responsive-container">
        <img src={error404Image} alt="Error 404 Not Found" />
        <Button variant="dark">
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            Go back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NoFound;
