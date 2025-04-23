import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Navigation */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/movies" className="text-light text-decoration-none">Movies</Link></li>
              <li><Link to="/new-releases" className="text-light text-decoration-none">New Releases</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Help</h5>
            <ul className="list-unstyled">
              <li><Link to="/about-us" className="text-light text-decoration-none">About Us</Link></li>
              <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Account</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">My Profile</a></li>
              <li><a href="#" className="text-light text-decoration-none">Subscriptions</a></li>
              <li><a href="#" className="text-light text-decoration-none">History</a></li>
              <li><a href="#" className="text-light text-decoration-none">Favorites</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              {/*<a href="#" className="text-light fs-5"><FaFacebookF /></a>*/}
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="bg-secondary" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
