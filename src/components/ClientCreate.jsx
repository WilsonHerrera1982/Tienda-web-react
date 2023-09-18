import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const ClientCreate = () => {
   const [client, setClient] = useState({
      nombre: '',
      email: '',
      telefono: '',
   });

   const [clients, setClients] = useState([]);

   useEffect(() => {
      // Cargar la lista de tiendas al montar el componente
      Axios.get('http://localhost:8080/api/clientes')
         .then(res => {
            setClients(res.data);
         });
   }, []);

   const handleChange = e => {
      const { id, value } = e.target;
      if (id === 'clientId') {
         setClient(prevClient => ({
            ...prevClient,
            clientId: value,           
         }));
      } else {
         setClient(prevClient => ({
            ...prevClient,
            [id]: value,
         }));
      }
   };
   
const handleSubmit = () => {
   // Verificar si el campo de tienda está vacío
   console.log(client);
  

   Axios.post('http://localhost:8080/api/clientes', client)
      .then(res => {
         // Manejar la respuesta del servidor después de crear el producto
         console.log('Cliente creado:', res.data);
         alert('Cliente registrado'); // Mostrar alerta
      })
      .catch(error => {
         // Manejar errores en caso de que la solicitud falle
         console.error('Error al crear el producto:', error);
      });
};

   return (
      <div className="container mt-4">
         <h4>Registro de Cliente</h4>
         <form>
            <div className="form-group">
               <label htmlFor="nombre">Nombre</label>
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
          
            <Link to="/cliente" className="btn btn-primary mt-3">
                  Regresar a la lista de clientes
               </Link>
            <button
               type="button"
               className="btn btn-success"
               onClick={handleSubmit}
            >
               Confirmar
            </button>
         </form>
      </div>
   );
};

export default ClientCreate;
