import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const ProductDetail = () => {
   const [product, setProduct] = useState(null);
   const { productId } = useParams();
   const [showConfirmation, setShowConfirmation] = useState(false);

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/productos/${productId}`)
         .then(res => {
            console.log(res.data);
            setProduct(res.data);
         });
   }, [productId]);

   const handleDelete = () => {
      // Aquí puedes mostrar una confirmación antes de eliminar el producto.
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmDelete) {
         Axios.delete(`http://localhost:8080/api/productos/${productId}`)
            .then(() => {     
               alert('Producto eliminado'); // Mostrar alerta       
            })
            .catch(error => {
               console.error(error);
            });
      }
   };

   return (
      <div className="container mt-4">
         {!product && <em>Loading...</em>}
         {product && (
            <div>
               <h4>Producto Detalle: {product.nombre}</h4>
               <div className="row">
                  <div className="col">
                     <p>ID: {product.id}</p>
                     <p>Precio: {product.precio}</p>
                     <p>Stock: {product.stock}</p>
                  </div>
                  <div className="col">
                     <h3>Tienda</h3>
                     <p>Tienda: {product.tienda.nombre}</p>
                     <p>Dirección de la Tienda: {product.tienda.direccion}</p>
                     <p>Teléfono de la Tienda: {product.tienda.telefono}</p>
                  </div>
               </div>
               <Link to="/producto" className="btn btn-primary mt-3">
                  Regresar a la lista de productos
               </Link>
               <button className="btn btn-danger mt-3 ml-2" onClick={() => setShowConfirmation(true)}>
                  Eliminar
               </button>
               {showConfirmation && (
                  <div className="mt-3">
                     <p>¿Estás seguro de eliminar este registro?</p>
                     <button className="btn btn-danger mr-2" onClick={handleDelete}>
                        Sí, eliminar
                     </button>
                     <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>
                        Cancelar
                     </button>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}

export default ProductDetail;
