import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const ProductDetail = () => {
   const [product, setProduct] = useState(null);

   const { productId } = useParams();

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/productos/${productId}`)
         .then(res => {
            console.log(res.data); // Imprime la respuesta completa en la consola
            setProduct(res.data);
         })
   }, [productId]);

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
            </div>
         )}
      </div>
   );
}

export default ProductDetail;
