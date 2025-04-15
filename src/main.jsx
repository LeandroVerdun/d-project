import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainPage } from './assets/pages/main';
import Login from './assets/pages/Login';
import RegistrationForm from './assets/pages/Register';
import { Navbar } from './assets/layout/navbar';
import { Footer } from './assets/layout/Footer';
import Pueba from './assets/pages/Pueba';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RegistrationForm />
    <Footer />
  </StrictMode>
);
