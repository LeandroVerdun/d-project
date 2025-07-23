import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <Link to="/admin/users" className="btn btn-info mx-1">
  Administrar Usuarios
</Link>
<Link to="/admin/orders" className="btn btn-secondary mx-1">
  Historial de Órdenes
</Link>
<Link to="/admin/stock" className="btn btn-warning mx-1">
  Administrar Stock
</Link>

    </>
  );
};

export default AdminMenu;
