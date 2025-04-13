import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainPage } from './assets/pages/main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
