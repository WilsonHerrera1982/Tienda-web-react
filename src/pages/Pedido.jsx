import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from "axios";

import PedidoList from '../components/PedidoList';
import PedidoCreate from '../components/PedidoCreate';
import PedidoDelete from '../components/PedidoDelete';
const Pedido = () => {
   const [pedidos, setPedidos] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:8080/api/pedidos")
         .then(res => {
            console.log(res); // Imprime la respuesta completa en la consola
            setPedidos(res.data);
         })
   }, []);
    return (
      <>
       <Routes>
            <Route
               index
               element={<PedidoList pedidos={pedidos} />}
            />
             <Route path="delete/:pedidoId" element={<PedidoDelete />} /> {/* Ruta para eliminar */}
            <Route path="crear/" element={<PedidoCreate />} />
           
         </Routes>
         </>
    );
 }
 
export default Pedido;