// src/component/admin/UserManagementPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import * as userService from "../../services/userService"; // Importamos el servicio de usuarios
import styles from "./AdminPage.module.css"; // Reutilizamos estilos

// Importar el nuevo modal de edición
import EditUserModal from "./EditUserModal";

const UserManagementPage = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de edición
  const [userToEdit, setUserToEdit] = useState(null); // Estado para almacenar el usuario a editar

  useEffect(() => {
    // **Paso 1: Verificación de acceso por rol 'isAdmin' (igual que en AdminPage)**
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404"); // Redirigir si no es admin
    } else {
      fetchUsers();
    }
  }, [navigate]); // Añadir navigate a las dependencias

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      // Filtrar al propio admin si no quieres que pueda eliminarse a sí mismo de la lista (opcional)
      // const loggedInUser = JSON.parse(localStorage.getItem("user"));
      // setUsers(data.filter(user => user._id !== loggedInUser.id));
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
    fetchUsers(); // Volver a cargar la lista de usuarios después de cerrar el modal para ver los cambios
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      await userService.updateUser(userId, updatedUserData);
      alert("Usuario actualizado con éxito!");
      // No necesitamos llamar a fetchUsers aquí porque ya se hace en closeEditModal
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      // Mejorar el manejo de errores: mostrar un mensaje más específico si err.response está disponible
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
        fetchUsers(); // Volver a cargar la lista después de eliminar
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
      {users.length === 0 ? (
        <p className="text-white">No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nombre</th> {/* Cambiado de Username a Nombre */}
                <th>Admin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name || "N/A"}</td> {/* Usa user.name aquí */}
                  <td>{user.isAdmin ? "Sí" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2" // Agregado margen a la derecha
                      onClick={() => handleEditClick(user)}
                    >
                      Editar
                    </button>
                    {/* Opcional: Deshabilitar eliminación del propio admin o del único admin */}
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

      {/* El Modal de Edición de Usuarios */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        userToEdit={userToEdit}
        onUpdateUser={handleUpdateUser} // Pasamos la función para actualizar
      />
    </div>
  );
};

export default UserManagementPage;
