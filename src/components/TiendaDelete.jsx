import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const TiendaDelete = () => {
   const [tienda, setTienda] = useState(null);
   const { tiendaId } = useParams();
   const [showConfirmation, setShowConfirmation] = useState(false);

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/tiendas/${tiendaId}`)
         .then(res => {
            setTienda(res.data);
         })
         .catch(error => {
            console.error('Error al cargar la tienda:', error);
         });
   }, [tiendaId]);

   const handleDelete = () => {
      // Aquí puedes mostrar una confirmación antes de eliminar la tienda.
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmDelete) {
         Axios.delete(`http://localhost:8080/api/tiendas/${tiendaId}`)
            .then(() => {
               console.log('Tienda eliminada exitosamente');
               // Redireccionar a la lista de tiendas u otra página después de la eliminación
            })
            .catch(error => {
               console.error('Error al eliminar la tienda:', error);
            });
      }
   };

   return (
      <div className="container mt-4">
         {!tienda && <em>Loading...</em>}
         {tienda && (
            <div>
               <h4>Detalle de Tienda: {tienda.nombre}</h4>
               <div className="row">
                  <div className="col">
                     <p>ID: {tienda.id}</p>
                     <p>Dirección: {tienda.direccion}</p>
                     <p>Teléfono: {tienda.telefono}</p>
                  </div>
               </div>
               <Link to="/tienda" className="btn btn-primary mt-3">
                  Regresar a la lista de tiendas
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

export default TiendaDelete;
