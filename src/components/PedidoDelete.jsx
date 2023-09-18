import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const PedidoDelete = () => {
   const [pedido, setPedido] = useState(null);
   const { pedidoId } = useParams();
   const [showConfirmation, setShowConfirmation] = useState(false);

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/pedidos/${pedidoId}`)
         .then(res => {
            setPedido(res.data);
         })
         .catch(error => {
            console.error('Error al cargar el pedido:', error);
         });
   }, [pedidoId]);

   const handleDelete = () => {
      // Aquí puedes mostrar una confirmación antes de eliminar el pedido.
      const confirmDelete = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmDelete) {
         Axios.delete(`http://localhost:8080/api/pedidos/${pedidoId}`)
            .then(() => {
               console.log('Pedido eliminado exitosamente');
               // Redireccionar a la lista de pedidos u otra página después de la eliminación
               window.location.href = '/pedido'; // Redirige a la lista de pedidos
            })
            .catch(error => {
               console.error('Error al eliminar el pedido:', error);
            });
      }
   };

   return (
      <div className="container mt-4">
         {!pedido && <em>Loading...</em>}
         {pedido && (
            <div>
               <h4>Detalle de Pedido: #{pedido.id}</h4>
               <div className="row">
                  <div className="col">
                     <p>Cliente: {pedido.cliente.nombre}</p>
                     <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
                     <p>Estado: {pedido.estado}</p>
                  </div>
               </div>
               <Link to="/pedido" className="btn btn-primary mt-3">
                  Regresar a la lista de pedidos
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

export default PedidoDelete;
