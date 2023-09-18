import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductEdit = () => {
    const { productId } = useParams(); // Obtener el ID del producto de los parámetros de la URL

   const [product, setProduct] = useState({
      nombre: '',
      precio: '',
      stock: '',
      tiendaId: '',
      tienda: {
         id: '',
      },
   });

   const [tiendas, setTiendas] = useState([]);

   useEffect(() => {
      // Cargar la lista de tiendas al montar el componente
      Axios.get('http://localhost:8080/api/tiendas')
         .then(res => {
            setTiendas(res.data);
         });
      
      // Cargar la información del producto por su ID
      Axios.get(`http://localhost:8080/api/productos/${productId}`)
         .then(res => {
            const productData = res.data;
            setProduct(productData);
         })
         .catch(error => {
            console.error('Error al cargar el producto:', error);
         });
   }, [productId]);

   const handleChange = e => {
      const { id, value } = e.target;
      if (id === 'tiendaId') {
         setProduct(prevProduct => ({
            ...prevProduct,
            tiendaId: value,
            tienda: {
               ...prevProduct.tienda,
               id: value,
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
      // Realizar la solicitud para actualizar el producto
      Axios.put(`http://localhost:8080/api/productos/${productId}`, product)
         .then(res => {
            // Manejar la respuesta del servidor después de actualizar el producto
            console.log('Producto actualizado:', res.data);
         })
         .catch(error => {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al actualizar el producto:', error);
         });
   };

   return (
      <div className="container mt-4">
         <h4>Editar Producto</h4>
         <form>
            <div className="form-group">
               <label htmlFor="nombre">Nombres</label>
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
           
            <Link to="/producto" className="btn btn-primary mr-2">
               Regresar a la lista de productos
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

export default ProductEdit;
