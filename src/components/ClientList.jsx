import React from 'react';
import { Link } from 'react-router-dom';

const ClientList = ({ clients }) => {
   return (
      <div className="container mt-4">
         <div className="mb-4">
            <Link to="/cliente/crear/" className="btn btn-primary">
               Nuevo Registro
            </Link>
         </div>
         {!clients ? <em>Loading...</em> : (
            <div>
               <h2>Listado de Clientes</h2>
               <ul className="list-group">
                  {clients.map(client => (
                     <li key={client.id} className="list-group-item">
                        <h4>{client.nombre}</h4>
                        <p><strong>ID:</strong> {client.id}</p>
                        <p><strong>Nombre:</strong> {client.nombre}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>Teléfono:</strong> {client.telefono}</p>
                        <div className="btn-group">
                           <Link to={`/cliente/edit/${client.id}`} className="btn btn-primary mr-2">
                              Editar
                           </Link>                             
                           <Link to={`/cliente/delete/${client.id}`} className="btn btn-danger mr-2">
                           Eliminar
                           </Link>                    
                           <Link to={`/cliente/${client.id}`} className="btn btn-info">
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

export default ClientList;
