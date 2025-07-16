import React from "react";
import styles from "./ProductTable.module.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className="table table-dark table-striped table-hover mt-4">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Autor</th>
            <th>Último Control</th>
            <th>Rating</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "auto", objectFit: "cover" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.author}</td>
              <td>
                {product.lastStockControlDate
                  ? new Date(product.lastStockControlDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{product.rating ? `${product.rating}/5` : "N/A"}</td>
              <td>
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.price)}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(product)}
                >
                  <i className="bi bi-pencil-square"></i> Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(product._id)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
