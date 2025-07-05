// src/component/admin/AdminOrderHistoryPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as orderService from "../../services/orderService";
import styles from "./AdminPage.module.css"; // Reutilizamos estilos
import { format } from "date-fns"; // Para formatear fechas
import { es } from "date-fns/locale"; // Para fechas en español

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

  // Calcular estadísticas para "usuario que compró más" y "valor precio que compró"
  const { topCustomers, totalRevenue } = useMemo(() => {
    const customerSpending = new Map();
    let totalRev = 0;

    orders.forEach((order) => {
      totalRev += order.totalAmount;
      const userId = order.user._id;
      const userName = order.user.name || order.user.email; // Usar nombre o email
      const userEmail = order.user.email;

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
    return (
      <div className="text-white text-center mt-5">
        Cargando historial de órdenes...
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Historial de Órdenes (Administrador)</h1>

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
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name || order.user.email}</td>
                  <td>{order.user.email}</td>
                  <td>
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                      locale: es,
                    })}
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
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
