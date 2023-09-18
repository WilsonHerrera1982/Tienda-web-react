import React from 'react';
import { Link } from 'react-router-dom';

const TiendaList = ({ tiendas }) => {
   return (
      <div className="container mt-4">
         <div className="mb-4">
            <Link to="/tienda/crear/" className="btn btn-primary">
               Nuevo Registro
            </Link>
         </div>
         {!tiendas ? (
            <em>Loading...</em>
         ) : (
            <div>
               <h2>Listado de Tiendas</h2>
               <ul className="list-group">
                  {tiendas.map(tienda => (
                     <li key={tienda.id} className="list-group-item">
                        <h4>{tienda.nombre}</h4>
                        <p><strong>ID:</strong> {tienda.id}</p>
                        <p><strong>Nombre:</strong> {tienda.nombre}</p>
                        <p><strong>Dirección:</strong> {tienda.direccion}</p>
                        <p><strong>Teléfono:</strong> {tienda.telefono}</p>
                        <div className="btn-group">
                           <Link to={`/tienda/edit/${tienda.id}`} className="btn btn-primary mr-2">
                              Editar
                           </Link>
                           <Link to={`/tienda/delete/${tienda.id}`} className="btn btn-danger mr-2">
                              Eliminar
                           </Link>
                           <Link to={`/tienda/${tienda.id}`} className="btn btn-info">
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

export default TiendaList;
