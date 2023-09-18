import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const TiendaCreate = () => {
   const [tienda, setTienda] = useState({
      nombre: '',
      direccion: '',
      telefono: '',
   });

   const handleChange = e => {
      const { id, value } = e.target;
      setTienda(prevTienda => ({
         ...prevTienda,
         [id]: value,
      }));
   };

   const handleSubmit = () => {
      // Realizar la solicitud para crear una tienda
      Axios.post('http://localhost:8080/api/tiendas', tienda)
         .then(res => {
            // Manejar la respuesta del servidor después de crear la tienda
            console.log('Tienda creada:', res.data);
            alert('Tienda registrada'); // Mostrar alerta
         })
         .catch(error => {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al crear la tienda:', error);
         });
   };

   return (
      <div className="container mt-4">
         <h4>Registro de Tienda</h4>
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

            <Link to="/tienda" className="btn btn-primary mt-3">
               Regresar a la lista de tiendas
            </Link>
            <button
               type="button"
               className="btn btn-success ml-2"
               onClick={handleSubmit}
            >
               Confirmar
            </button>
         </form>
      </div>
   );
};

export default TiendaCreate;
