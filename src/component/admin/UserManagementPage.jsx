// src/component/admin/UserManagementPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import styles from "./AdminPage.module.css";

// Importar el nuevo modal de edición
import EditUserModal from "./EditUserModal";
// Importar el menú de administración
import AdminMenu from "./AdminMenu";

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setError(
        "No se pudieron cargar los usuarios. Asegúrate de que tu backend esté funcionando y que tengas permisos de administrador."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setUserToEdit(null);
    fetchUsers();
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      await userService.updateUser(userId, updatedUserData);
      alert("Usuario actualizado con éxito!");
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      alert(
        `Error al actualizar el usuario: ${
          err.response?.data?.message || err.message || "Error desconocido"
        }. Revisa la consola.`
      );
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar al usuario ${userEmail}? Esta acción es irreversible.`
      )
    ) {
      try {
        await userService.deleteUser(userId);
        alert("Usuario eliminado con éxito!");
        fetchUsers();
      } catch (err) {
        console.error("Error al eliminar el usuario:", err);
        alert(
          `Error al eliminar el usuario: ${
            err.response?.data?.message || err.message || "Error desconocido"
          }. Revisa la consola.`
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando usuarios...</div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Administrar Usuarios</h1>

      {/* Aquí se incluye el menú */}
      <AdminMenu />

      {users.length === 0 ? (
        <p className="text-white">No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Admin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.isAdmin ? "Sí" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user._id, user.email)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        userToEdit={userToEdit}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagementPage;
