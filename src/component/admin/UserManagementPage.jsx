import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import styles from "./AdminPage.module.css";
import EditUserModal from "./EditUserModal";
import AdminMenu from "./AdminMenu";
import MessageModal from "../MessageModal";

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.id;

  const [messageModal, setMessageModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    onModalCloseRedirect: null,
  });

  const showMessage = (
    type,
    title,
    message,
    onConfirm = null,
    onModalCloseRedirect = null
  ) => {
    setMessageModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
      onModalCloseRedirect,
    });
  };

  const handleCloseMessageModal = () => {
    if (messageModal.onModalCloseRedirect) {
      messageModal.onModalCloseRedirect();
    }
    setMessageModal({ ...messageModal, show: false });
  };

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
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      showMessage(
        "error",
        "Error de Carga",
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
      showMessage(
        "success",
        "Usuario Actualizado",
        "Usuario actualizado con éxito!"
      );
      fetchUsers();
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      showMessage(
        "error",
        "Error al Actualizar Usuario",
        `Error al actualizar el usuario: ${
          err.response?.data?.message || err.message || "Error desconocido"
        }. Revisa la consola.`
      );
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (userId === loggedInUserId) {
      showMessage(
        "info",
        "Acción No Permitida",
        "No puedes eliminar tu propia cuenta de administrador."
      );
      return;
    }

    showMessage(
      "warning",
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar al usuario ${userEmail}? Esta acción es irreversible.`,
      async () => {
        try {
          await userService.deleteUser(userId);
          showMessage(
            "success",
            "Usuario Eliminado",
            "Usuario eliminado con éxito!"
          );
          fetchUsers();
        } catch (err) {
          console.error("Error al eliminar el usuario:", err);
          showMessage(
            "error",
            "Error al Eliminar Usuario",
            `Error al eliminar el usuario: ${
              err.response?.data?.message || err.message || "Error desconocido"
            }. Revisa la consola.`
          );
        }
      }
    );
  };

  const filteredUsers = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user._id.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        (user.isAdmin ? "sí" : "no").includes(lowerCaseSearchTerm)
    );
  }, [users, searchTerm]);

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando usuarios...</div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Administrar Usuarios</h1>

      <div className="d-flex justify-content-center mb-4">
        <AdminMenu />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por email, ID, nombre o rol de administrador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 && !searchTerm ? (
        <p className="text-white">No hay usuarios registrados.</p>
      ) : filteredUsers.length === 0 && searchTerm ? (
        <p className="text-white">
          No hay usuarios que coincidan con la búsqueda.
        </p>
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
              {filteredUsers.map((user) => (
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
                      disabled={user._id === loggedInUserId}
                      title={
                        user._id === loggedInUserId
                          ? "No puedes eliminar tu propia cuenta de administrador."
                          : ""
                      }
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
      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        type={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        onConfirm={messageModal.onConfirm}
        onModalCloseRedirect={messageModal.onModalCloseRedirect}
      />
    </div>
  );
};

export default UserManagementPage;
