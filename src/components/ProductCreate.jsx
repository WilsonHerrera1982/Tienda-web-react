import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const ProductCreate = () => {
   const [product, setProduct] = useState({
      nombre: '',
      precio: '',
      stock: '',
      tiendaId: '', // Agrega un estado para almacenar el ID de la tienda seleccionada
      tienda: {
         id: '', // Agrega un estado para almacenar el ID de la tienda seleccionada
      },
   });

   const [tiendas, setTiendas] = useState([]);

   useEffect(() => {
      // Cargar la lista de tiendas al montar el componente
      Axios.get('http://localhost:8080/api/tiendas')
         .then(res => {
            setTiendas(res.data);
         });
   }, []);

   const handleChange = e => {
      const { id, value } = e.target;
      if (id === 'tiendaId') {
         setProduct(prevProduct => ({
            ...prevProduct,
            tiendaId: value,
            tienda: {
               ...prevProduct.tienda,
               id: value, // Actualiza también el ID de la tienda dentro del objeto tienda
            },
         }));
      } else {
         setProduct(prevProduct => ({
            ...prevProduct,
            [id]: value,
         }));
      }
   };
   
const handleSubmit = () => {
   // Verificar si el campo de tienda está vacío
   console.log(product);
  

   Axios.post('http://localhost:8080/api/productos', product)
      .then(res => {
         // Manejar la respuesta del servidor después de crear el producto
         console.log('Producto creado:', res.data);
         alert('Producto registrado'); // Mostrar alerta
      })
      .catch(error => {
         // Manejar errores en caso de que la solicitud falle
         console.error('Error al crear el producto:', error);
      });
};

   return (
      <div className="container mt-4">
         <h4>Registro de Producto</h4>
         <form>
            <div className="form-group">
               <label htmlFor="nombre">Nombre</label>
               <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={product.nombre}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="precio">Precio</label>
               <input
                  type="text"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={product.precio}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="stock">Stock</label>
               <input
                  type="text"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="tiendaId">Seleccionar Tienda</label>
               <select
                  className="form-control"
                  id="tiendaId"
                  name="tiendaId"
                  value={product.tiendaId}
                  onChange={handleChange}
               >
                  <option value="">Seleccionar Tienda</option>
                  {tiendas.map(tienda => (
                     <option key={tienda.id} value={tienda.id}>
                        {tienda.nombre}
                     </option>
                  ))}
               </select>
            </div>
            <Link to="/producto" className="btn btn-primary mt-3">
                  Regresar a la lista de productos
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

export default ProductCreate;
