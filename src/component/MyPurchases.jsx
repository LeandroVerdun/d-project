<<<<<<< HEAD
<<<<<<< HEAD
=======
// src/component/MyPurchases.jsx
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../services/orderService"; // Import the service
import "../css/MyPurchases.css"; // You can create this CSS file for styling

const MyPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;
        }
        // No necesitas pasar el userId aquí, el backend lo obtendrá del token.
        // Asegúrate de que tu orderService.js también lo llame sin el ID.
        const data = await getUserOrders(); // <--- La llamada se mantiene igual si userService está bien.
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Error al cargar tus compras. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5 text-white">Cargando tus compras...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5 text-white">
      <h2>Mis Compras</h2>
      {orders.length === 0 ? (
        <p className="text-center">No has realizado ninguna compra todavía.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="card mb-3 bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Orden ID: {order._id}</h5>
                <p className="card-text">
                  Fecha: {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {/* Usar order.createdAt */}
                </p>
                <p className="card-text">Estado: {order.status}</p>
                <p className="card-text">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <h6>Productos:</h6>
                <ul className="list-group list-group-flush">
                  {/* Asegúrate que 'items' es el array correcto de productos en la orden */}
                  {order.items.map(
                    (
                      item // <--- Cambiado de order.products a order.items
                    ) => (
                      <li
                        key={item.product._id}
                        className="list-group-item bg-secondary text-white"
                      >
                        {item.name} - Cantidad: {item.quantity} - Precio
                        Unitario: ${item.priceAtPurchase.toFixed(2)}{" "}
                        {/* Usar priceAtPurchase */}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
<<<<<<< HEAD
          ))
        )}
      </div>
=======
// src/component/MyPurchases.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../services/orderService"; // Import the service
import "../css/MyPurchases.css"; // You can create this CSS file for styling

const MyPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;
        }

        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Error al cargar tus compras. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5 text-white">Cargando tus compras...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5 text-white">
      <h2>Mis Compras</h2>
      {orders.length === 0 ? (
        <p className="text-center">No has realizado ninguna compra todavía.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="card mb-3 bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Orden ID: {order._id}</h5>
                <p className="card-text">
                  Fecha: {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {/* Usar order.createdAt */}
                </p>
                <p className="card-text">Estado: {order.status}</p>
                <p className="card-text">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <h6>Productos:</h6>
                <ul className="list-group list-group-flush">
                  {order.items.map((item) => (
                    <li
                      key={item.product._id}
                      className="list-group-item bg-secondary text-white"
                    >
                      {item.name} - Cantidad: {item.quantity} - Precio Unitario:
                      ${item.priceAtPurchase.toFixed(2)}{" "}
                      {/* Usar priceAtPurchase */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
>>>>>>> backup-local-cambios
=======
          ))}
        </div>
      )}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    </div>
  );
};

export default MyPurchases;
