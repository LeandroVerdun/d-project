import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene acceso
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.username !== "Chisato") {
      navigate("/"); // Redirige si no es Chisato
      return;
    }

    setLoggedInUser(user);

    // Obtener y filtrar usuarios
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = usersList.filter((u) => u.username !== user.username);
    setUsers(filteredUsers);
  }, [navigate]);

  const handleDelete = (username) => {
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsersList = usersList.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsersList));
    setUsers(updatedUsersList);
  };

  const handleViewPurchases = (username) => {
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const userPurchases = purchases.filter((purchase) => purchase.username === username);
    alert(`Compras de ${username}: ${userPurchases.map((p) => p.item).join(", ")}`);
  };

  return (
    <div className="container mt-5">
      <h2>User Admin</h2>
      <div className="list-group">
        {users.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          users.map((user) => (
            <div key={user.username} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.username}</strong>
                <div>
                  <small>Email: {user.email}</small>
                </div>
              </div>
              <div>
                <button className="btn btn-info me-2" onClick={() => handleViewPurchases(user.username)}>
                  Ver Compras
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.username)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
