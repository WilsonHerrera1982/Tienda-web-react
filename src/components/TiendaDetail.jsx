import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const TiendaDetail = () => {
   const [tienda, setTienda] = useState(null);

   const { tiendaId } = useParams();

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/tiendas/${tiendaId}/productos`)
         .then(res => {
            setTienda(res.data);
         })
         .catch(error => {
            console.error('Error al cargar la tienda y sus productos:', error);
         });
   }, [tiendaId]);
   

   return (
      <div className="container mt-4">
         {!tienda && <em>Loading...</em>}
         {tienda && (
            <div>
               <h4>Detalle de Tienda: {tienda.nombre}</h4>
               <p>ID: {tienda.id}</p>
               <p>Nombre: {tienda.nombre}</p>
               <p>Dirección: {tienda.direccion}</p>
               <p>Teléfono: {tienda.telefono}</p>

               {tienda.productos && tienda.productos.length > 0 && (
                  <div>
                     <h5>Productos:</h5>
                     <ul>
                        {tienda.productos.map(producto => (
                           <li key={producto.id}>
                              <strong>Nombre:</strong> {producto.nombre}<br />
                              <strong>Precio:</strong> {producto.precio}<br />
                              <strong>Stock:</strong> {producto.stock}
                           </li>
                        ))}
                     </ul>
                  </div>
               )}

               <Link to="/tienda" className="btn btn-primary mt-3">
                  Regresar a la lista de tiendas
               </Link>
            </div>
         )}
      </div>
   );
}

export default TiendaDetail;
