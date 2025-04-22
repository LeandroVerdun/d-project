import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Obtén el usuario logueado
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);

    // Obtén la lista de usuarios desde localStorage
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    // Filtrar al usuario logueado de la lista
    const filteredUsers = usersList.filter((u) => u.username !== user.username);
    setUsers(filteredUsers);
  }, []);

  const handleDelete = (username) => {
    // Elimina el usuario de la lista de usuarios en localStorage
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsersList = usersList.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsersList));

    // Actualiza el estado de los usuarios para reflejar los cambios
    setUsers(updatedUsersList);
  };

  const handleViewPurchases = (username) => {
    // Obtiene las compras del usuario desde localStorage
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const userPurchases = purchases.filter((purchase) => purchase.username === username);
    
    // Muestra las compras (puedes personalizarlo para que se muestre en un modal o en otra página)
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
