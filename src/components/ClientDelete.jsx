import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const ClientDelete = () => {
   const [client, setClient] = useState(null);
   const { clientId } = useParams();
   const [showConfirmation, setShowConfirmation] = useState(false);

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/clientes/${clientId}`)
         .then(res => {
            console.log(res.data);
            setClient(res.data);
         });
   }, [clientId]);

   const handleDelete = () => {
      // Aquí puedes mostrar una confirmación antes de eliminar el producto.
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmDelete) {
         Axios.delete(`http://localhost:8080/api/clientes/${clientId}`)
            .then(() => {            
            })
            .catch(error => {
               console.error(error);
            });
      }
   };

   return (
      <div className="container mt-4">
         {!client && <em>Loading...</em>}
         {client && (
            <div>
               <h4>Cliente Detalle: {client.nombre}</h4>
               <div className="row">
                  <div className="col">
                     <p>ID: {client.id}</p>
                     <p>Email: {client.email}</p>
                     <p>Teléfono: {client.telefono}</p>
                  </div>
                  
               </div>
               <Link to="/cliente" className="btn btn-primary mt-3">
                  Regresar a la lista de clientes
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

export default ClientDelete;
