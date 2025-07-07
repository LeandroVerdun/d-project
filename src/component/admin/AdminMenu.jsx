import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <Link to="/admin/users" className="btn btn-info">
        {" "}
        Administrar Usuarios
      </Link>
      <Link to="/admin/orders" className="btn btn-secondary">
        {" "}
        Historial de Órdenes
      </Link>
      <Link to="/admin/stock" className="btn btn-warning">
        {" "}
        Administrar Stock
      </Link>
    </>
  );
};

export default AdminMenu;
