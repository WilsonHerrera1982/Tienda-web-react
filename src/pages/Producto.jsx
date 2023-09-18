import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from "axios";

import ProductsList from '../components/ProductsList';
import ProductDetail from '../components/ProductDetail';
import ProductDelete from '../components/ProductDelete';
import ProductCreate from '../components/ProductCreate';
import ProductEdit from '../components/ProductEdit';

const Producto = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:8080/api/productos")
         .then(res => {
            console.log(res); // Imprime la respuesta completa en la consola
            console.log(res.data.products); // Intenta acceder a res.data.products
            setProducts(res.data);
         })
   }, []);
    return (
      <>
       <Routes>
            <Route
               index
               element={<ProductsList products={products} />}
            />
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="delete/:productId" element={<ProductDelete />} /> {/* Ruta para eliminar */}
            <Route path="crear/" element={<ProductCreate />} />
            <Route path="edit/:productId" element={<ProductEdit />} /> {/* Ruta para editar */}
         </Routes>
         </>
    );
 }
 
export default Producto;