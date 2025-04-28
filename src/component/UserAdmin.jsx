import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.username !== "Chisato") {
      navigate("/");
      return;
    }

    setLoggedInUser(user);

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
    alert(`Purchases by ${username}: ${userPurchases.map((p) => p.item).join(", ")}`);
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">User Admin</h2>
      <div className="list-group">
        {users.length === 0 ? (
          <p className="text-white-50">There are no users to display.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.username}
              className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center mb-2 transition-hover"
              style={{
                transition: "background-color 0.3s, transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#343a40";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#212529";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div>
                <strong>{user.username}</strong>
                <div>Email: {user.email}</div>
              </div>
              <div>
                <button
                  className="btn btn-outline-info btn-sm me-2"
                  onClick={() => handleViewPurchases(user.username)}
                >
                  View Purchases
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(user.username)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
