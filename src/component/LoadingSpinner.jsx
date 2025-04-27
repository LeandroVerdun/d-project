
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="text-white ms-3">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
