import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminPage.module.css";

const AdminMenu = ({ onNewProduct }) => {
  return (
    <>
      <Link to="/admin/users" className="btn btn-info me-3">
        Administrar Usuarios
      </Link>
      <Link to="/admin/orders" className="btn btn-secondary me-3">
        Historial de Órdenes
      </Link>
      <Link to="/admin/stock" className="btn btn-warning me-3">
        Administrar Stock
      </Link>
      
    </>
  );
};

export default AdminMenu;
