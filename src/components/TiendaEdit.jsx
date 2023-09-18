import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TiendaEdit = () => {
   const { tiendaId } = useParams(); // Obtener el ID del cliente de los parámetros de la URL

   const [tienda, setTienda] = useState({
      nombre: '',
      direccion: '',
      telefono: '',
   });

   useEffect(() => {
      // Cargar la información de la tienda por su ID
      Axios.get(`http://localhost:8080/api/tiendas/${tiendaId}`)
         .then(res => {
            const tiendaData = res.data;
            setTienda(tiendaData);
         })
         .catch(error => {
            console.error('Error al cargar la tienda:', error);
         });
   }, [tiendaId]); // Asegúrate de incluir [clientId] en las dependencias para cargar la tienda correcta

   const handleChange = e => {
      const { id, value } = e.target;
      
      setTienda(prevTienda => ({
         ...prevTienda,
         [id]: value,
      }));
   };

   const handleSubmit = () => {
      // Realizar la solicitud para actualizar la tienda
      Axios.put(`http://localhost:8080/api/tiendas/${tiendaId}`, tienda)
         .then(res => {
            // Manejar la respuesta del servidor después de actualizar la tienda
            console.log('Tienda actualizada:', res.data);
            alert('Tienda actualizada'); // Mostrar alerta
         })
         .catch(error => {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al actualizar la tienda:', error);
         });
   };

   return (
      <div className="container mt-4">
         <h4>Editar Tienda</h4>
         <form>
            <div className="form-group">
               <label htmlFor="nombre">Nombre</label>
               <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={tienda.nombre}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="direccion">Dirección</label>
               <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={tienda.direccion}
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
                  value={tienda.telefono}
                  onChange={handleChange}
               />
            </div>
           
            <Link to="/tienda" className="btn btn-primary mr-2">
               Regresar a la lista de tiendas
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

export default TiendaEdit;
