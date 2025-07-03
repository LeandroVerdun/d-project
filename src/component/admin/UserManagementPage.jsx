// src/component/admin/UserManagementPage.jsx
import React, { useState, useEffect } from "react";
import * as userService from "../../services/userService"; // Importamos el nuevo servicio de usuarios
import styles from "./AdminPage.module.css"; // Puedes reutilizar los estilos de AdminPage o crear uno nuevo

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      // Filtra o transforma los datos si es necesario, por ejemplo, para no mostrar al propio admin en la lista si lo deseas
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

  const handleDeleteUser = async (userId, userEmail) => {
    // Implementar confirmación para eliminar usuarios
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
            err.message || "Error desconocido"
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
                <th>Username</th>
                <th>Admin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.username || "N/A"}</td>
                  <td>{user.isAdmin ? "Sí" : "No"}</td>
                  <td>
                    {/* Opcional: Deshabilitar eliminación del propio admin o del único admin */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user._id, user.email)}
                    >
                      Eliminar
                    </button>
                    {/* Puedes añadir un botón para 'Suspender' o 'Editar Rol' aquí si lo necesitas */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
