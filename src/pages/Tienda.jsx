import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from "axios";

import TiendaList from '../components/TiendaList';
import TiendaDetail from '../components/TiendaDetail';
import TiendaDelete from '../components/TiendaDelete';
import TiendaCreate from '../components/TiendaCreate';
import TiendaEdit from '../components/TiendaEdit';

const Tienda = () => {
   const [tiendas, setTiendas] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:8080/api/tiendas")
         .then(res => {
            console.log(res); // Imprime la respuesta completa en la consola
            setTiendas(res.data);
         })
   }, []);
    return (
      <>
       <Routes>
            <Route
               index
               element={<TiendaList tiendas={tiendas} />}
            />
            <Route path=":tiendaId" element={<TiendaDetail />} />
            <Route path="delete/:tiendaId" element={<TiendaDelete />} /> {/* Ruta para eliminar */}
            <Route path="crear/" element={<TiendaCreate />} />
            <Route path="edit/:tiendaId" element={<TiendaEdit />} /> {/* Ruta para editar */}
         </Routes>
         </>
    );
 }
 
export default Tienda;