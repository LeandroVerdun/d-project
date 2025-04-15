import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Navegación */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Navegación</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-light text-decoration-none">Películas</a></li>
              <li><a href="#" className="text-light text-decoration-none">Nuevos lanzamientos</a></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Ayuda</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Centro de soporte</a></li>
              <li><a href="#" className="text-light text-decoration-none">Términos de servicio</a></li>
              <li><a href="#" className="text-light text-decoration-none">Política de privacidad</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          {/* Cuenta */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Cuenta</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Mi Perfil</a></li>
              <li><a href="#" className="text-light text-decoration-none">Suscripciones</a></li>
              <li><a href="#" className="text-light text-decoration-none">Historial</a></li>
              <li><a href="#" className="text-light text-decoration-none">Favoritos</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Síguenos</h5>
            <div className="d-flex gap-3">
              {/*<a href="#" className="text-light fs-5"><FaFacebookF /></a>*/}
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <hr className="bg-secondary" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} TuAppDePelículas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
