import React from "react";
// Reutilizamos el mismo archivo de estilos si existe
import styles from "./MovieTable.module.css";

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
                  style={{ width: "50px", height: "auto" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.author}</td>
              <td>
                {new Date(product.lastStockControlDate).toLocaleDateString()}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(product._id)}
                >
                  Eliminar
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
