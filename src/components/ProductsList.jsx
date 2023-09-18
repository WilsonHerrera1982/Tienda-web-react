import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
   return (
      <div className="container mt-4">
         <div className="mb-4">
            <Link to="/producto/crear/" className="btn btn-primary">
               Nuevo Registro
            </Link>
         </div>
         {!products ? <em>Loading...</em> : (
            <div>
               <h2>Listado de Productos</h2>
               <ul className="list-group">
                  {products.map(product => (
                     <li key={product.id} className="list-group-item">
                        <h4>{product.nombre}</h4>
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Precio:</strong> {product.precio}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Tienda:</strong> {product.tienda.nombre}</p>
                        <div className="btn-group">
                           <Link to={`/producto/edit/${product.id}`} className="btn btn-primary mr-2">
                              Editar
                           </Link>                             
                           <Link to={`/producto/delete/${product.id}`} className="btn btn-danger mr-2">
                           Eliminar
                           </Link>                    
                           <Link to={`/producto/${product.id}`} className="btn btn-info">
                              Detalles
                           </Link>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}

export default ProductList;
