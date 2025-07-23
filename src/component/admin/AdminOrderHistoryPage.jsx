import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as orderService from "../../services/orderService";
import styles from "./AdminPage.module.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AdminMenu from "./AdminMenu";

const orderStatuses = ["processing", "shipped", "completed", "cancelled"];

const AdminOrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error al obtener todas las órdenes:", err);
      setError(
        "No se pudieron cargar las órdenes. Asegúrate de que el backend esté funcionando y tengas permisos de administrador."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
      alert("No se pudo actualizar el estado. Intente nuevamente.");
    }
  };

  const { topCustomers, totalRevenue } = useMemo(() => {
    const customerSpending = new Map();
    let totalRev = 0;

    orders.forEach((order) => {
      totalRev += order.totalAmount;
      const userId = order.user?._id;
      const userName = order.user?.name || order.user?.email || "Desconocido";
      const userEmail = order.user?.email || "N/A";

      if (!userId) return; // Ignorar si no hay usuario

      if (!customerSpending.has(userId)) {
        customerSpending.set(userId, {
          name: userName,
          email: userEmail,
          totalSpent: 0,
          orderCount: 0,
        });
      }
      const current = customerSpending.get(userId);
      customerSpending.set(userId, {
        ...current,
        totalSpent: current.totalSpent + order.totalAmount,
        orderCount: current.orderCount + 1,
      });
    });

    const sortedCustomers = Array.from(customerSpending.values()).sort(
      (a, b) => b.totalSpent - a.totalSpent
    );

    return { topCustomers: sortedCustomers, totalRevenue: totalRev };
  }, [orders]);

  if (loading) {
    return <div className="text-white text-center mt-5">Cargando historial de órdenes...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <div className="text-center mb-4">
        <h1>Historial de Órdenes (Administrador)</h1>
        <div className="d-flex justify-content-center mt-3">
          <AdminMenu />
        </div>
      </div>


      <div className="mb-4">
        <h2 className="text-white mb-3">Estadísticas Clave</h2>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card bg-dark text-white p-3">
              <h5 className="card-title">Órdenes Totales</h5>
              <p className="card-text fs-4">{orders.length}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card bg-dark text-white p-3">
              <h5 className="card-title">Ingresos Totales</h5>
              <p className="card-text fs-4">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-white mb-3">Clientes con Mayor Gasto</h2>
        {topCustomers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Total Gastado</th>
                  <th>Órdenes</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>${customer.totalSpent.toFixed(2)}</td>
                    <td>{customer.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white">No hay datos de clientes aún.</p>
        )}
      </div>

      <h2 className="text-white mb-3">Todas las Órdenes</h2>
      {orders.length === 0 ? (
        <p className="text-white">No hay órdenes registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Email Cliente</th>
                <th>Fecha</th>
                <th>Cantidad Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || order.user?.email || "Desconocido"}</td>
                  <td>{order.user?.email || "N/A"}</td>
                  <td>
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                      locale: es,
                    })}
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="form-select form-select-sm"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
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

export default AdminOrderHistoryPage;
