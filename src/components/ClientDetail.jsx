import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

const ClientDetail = () => {
   const [client, setClient] = useState(null);

   const { clientId } = useParams();

   useEffect(() => {
      Axios.get(`http://localhost:8080/api/clientes/${clientId}`)
         .then(res => {
            console.log(res.data); // Imprime la respuesta completa en la consola
            setClient(res.data);
         })
   }, [clientId]);

   return (
      <div className="container mt-4">
         {!client && <em>Loading...</em>}
         {client && (
            <div>
               <h4>Cliente Detalle: {client.nombre}</h4>
               <div className="row">
                  <div className="col">
                     <p>ID: {client.id}</p>
                     <p>Nombre: {client.nombre}</p>
                     <p>Email: {client.email}</p>
                     <p>Teléfono: {client.telefono}</p>
                  </div>                 
               </div>
               <Link to="/cliente" className="btn btn-primary mt-3">
                  Regresar a la lista de clientes
               </Link>
            </div>
         )}
      </div>
   );
}

export default ClientDetail;
