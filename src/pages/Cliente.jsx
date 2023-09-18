import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from "axios";

import ClientList from '../components/ClientList';
import ClientDetail from '../components/ClientDetail';
import ClientDelete from '../components/ClientDelete';
import ClientCreate from '../components/ClientCreate';
import ClientEdit from '../components/ClientEdit';

const Cliente = () => {
   const [clients, setClients] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:8080/api/clientes")
         .then(res => {
            console.log(res); // Imprime la respuesta completa en la consola
            setClients(res.data);
         })
   }, []);
    return (
      <>
       <Routes>
            <Route
               index
               element={<ClientList clients={clients} />}
            />
            <Route path=":clientId" element={<ClientDetail />} />
            <Route path="delete/:clientId" element={<ClientDelete />} /> {/* Ruta para eliminar */}
            <Route path="crear/" element={<ClientCreate />} />
            <Route path="edit/:clientId" element={<ClientEdit />} /> {/* Ruta para editar */}
         </Routes>
         </>
    );
 }
 
export default Cliente;