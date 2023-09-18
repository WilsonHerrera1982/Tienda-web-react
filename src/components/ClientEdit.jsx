import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ClientEdit = () => {
    const { clientId } = useParams(); // Obtener el ID del cliente de los parámetros de la URL

   const [client, setClient] = useState({
      nombre: '',
      email: '',
      telefono: '',
   });

   useEffect(() => {
      // Cargar la información del cliente por su ID
      Axios.get(`http://localhost:8080/api/clientes/${clientId}`)
         .then(res => {
            const clientData = res.data;
            setClient(clientData);
         })
         .catch(error => {
            console.error('Error al cargar el cliente:', error);
         });
   }, [clientId]); // Asegúrate de incluir [clientId] en las dependencias para cargar el cliente correcto

   const handleChange = e => {
      const { id, value } = e.target;
      
      setClient(prevClient => ({
         ...prevClient,
         [id]: value,
      }));
   };

   const handleSubmit = () => {
      // Realizar la solicitud para actualizar el cliente
      Axios.put(`http://localhost:8080/api/clientes/${clientId}`, client)
         .then(res => {
            // Manejar la respuesta del servidor después de actualizar el cliente
            console.log('Cliente actualizado:', res.data);
            alert('Cliente actualizado'); // Mostrar alerta
         })
         .catch(error => {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al actualizar el cliente:', error);
         });
   };

   return (
      <div className="container mt-4">
         <h4>Editar Cliente</h4>
         <form>
            <div className="form-group">
               <label htmlFor="nombre">Nombres</label>
               <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={client.nombre}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="telefono">Teléfono</label>
               <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={client.telefono}
                  onChange={handleChange}
               />
            </div>
           
            <Link to="/cliente" className="btn btn-primary mr-2">
               Regresar a la lista de clientes
            </Link>
            <button
               type="button"
               className="btn btn-success"
               onClick={handleSubmit}
            >
               Guardar Cambios
            </button>
         </form>
      </div>
   );
};

export default ClientEdit;
